import styled from "@emotion/styled";

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 250px);
  grid-template-rows: repeat(4, 250px);
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  gap: 2px; /* Creates spacing between the grid cells */

  & > div {
    border: 2px solid rgba(241, 139, 53, 1); /* Border for each cell */
    background: white; /* Keeps the card background visible */
  }

  @media only screen and (max-height: 1000px) {
    grid-template-columns: repeat(5, 220px);
    grid-template-rows: repeat(4, 220px);
  }

  @media only screen and (max-height: 800px) {
    grid-template-columns: repeat(5, 25vh);
    grid-template-rows: repeat(4, 25vh);
  }

  @media only screen and (max-width: 1300px) {
    grid-template-columns: repeat(5, 16vw);
    grid-template-rows: repeat(4, 16vw);
  }
`;

export default CardGrid;
