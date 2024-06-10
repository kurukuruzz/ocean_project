import styled from "styled-components";

export default function Navigation() {
  return (
    <Container>
      <div className="article">
          <Sidebar
              address={address}
          />
          <Map
              setAddress={setAddress}
          />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`