import { Server } from "socket.io";
import { Player } from "types";
import { log } from "./logger";
import { console } from "inspector";
const players: Player[] = [];
const MAX_PLAYERS_PER_TEAM = 4;
export class GameSocket {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
    this.setupSocketEvents();
  }

  private setupSocketEvents() {
    this.io.on("connection", async (socket) => {
      socket.on("join", async (data) => {
        const teamCount = players.filter(
          (player) => player.team === data.team
        ).length;

        if (teamCount >= MAX_PLAYERS_PER_TEAM) {
          socket.emit("error", { message: `Team ${data.team} is full.` });
          return;
        }

        const newPlayer: Player = {
          id: `${socket.id}`, // Use socket ID for unique identification
          name: data.name,
          role: "operative",
          team: data.team,
        };

        players.push(newPlayer);

        this.io.emit("joined", {
          name: data.name,
          player: newPlayer,
          players: players,
        });

        this.io.emit("updatePlayers", players); // Broadcast updated player list
      });
      socket.on("gameUpdate", async (data) => {
        this.io.emit("updatedGame", data);
      });
      socket.on("sendClue", async (data) => {
        this.io.emit("clues", data);
      });
      socket.on("start", (data) => {
        if (players.length < 4) {
          socket.emit("error", {
            message: `You must have a minimum of 4 members`,
          });
          return;
        }

        let shuffledPlayers: any[] = [...players];
        let redTeam: any[] = [];
        let blueTeam: any[] = [];

        // Keep shuffling until spymasters are on different teams
        do {
          shuffledPlayers = [...players].sort(() => Math.random() - 0.5);

          const mid = Math.floor(shuffledPlayers.length / 2);
          redTeam = shuffledPlayers.slice(0, mid);
          blueTeam = shuffledPlayers.slice(mid);

          if (redTeam.length === 0 || blueTeam.length === 0) continue; // Ensure teams are valid

          redTeam.forEach((player) => (player.role = "operative"));
          blueTeam.forEach((player) => (player.role = "operative"));

          // Assign one spymaster per team
          const redSpyIndex = Math.floor(Math.random() * redTeam.length);
          const blueSpyIndex = Math.floor(Math.random() * blueTeam.length);

          redTeam[redSpyIndex].role = "spymaster";
          blueTeam[blueSpyIndex].role = "spymaster";
        } while (
          redTeam[0].role !== "spymaster" ||
          blueTeam[0].role !== "spymaster"
        ); // Ensure valid teams

        log.info("Game started with valid teams!");

        // Emit the game start event
        this.io.emit("started", {
          players: [...redTeam, ...blueTeam], // Merge teams properly
          cards: data.cards,
          keyCards: data.keyCards,
          currentTurn: data.currentTurn,
        });
      });

      socket.on("disconnect", () => {
        const index = players.findIndex((player) => player.id === socket.id);
        if (index !== -1) {
          players.splice(index, 1); // Remove the player from the list
        }
        this.io.emit("updatePlayers", players);
        log.error("Client disconnected:");
      });
    });
  }
}
