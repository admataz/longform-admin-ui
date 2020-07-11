import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

// import DocumentProvider from "./components/DocumentProvider";

import DocumentsPage from "./pages/Documents";
import DocSchemaPage from "./pages/DocSchema";
import DocumentItem from "./components/DocumentItem";
import TopBar from "./components/TopBar";
import styled from "styled-components";

const Container = styled("div")`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled("header")`
  flex: 1 0 100px;
  background-color: #efefef;
`;
const Main = styled("main")`
  flex: 1 1 100%;
`;

const Content = styled("div")`
  width: 100%;
  max-width: 960px;
  padding: 20px;
`;

const Footer = styled("footer")`
  background-color: #333;
  flex: 1 0 80px;
`;

function App() {
  return (
    <Router>
        <Container>
          <Header>
            <TopBar />
          </Header>
          <Main>
            <Content>
              <Switch>
                <Route
                  path="/document/create/:schemaId?"
                  component={DocumentItem}
                />
                <Route path="/document/:documentId" component={DocumentItem} />
                <Route
                  exact
                  path="/documents/:schemaId?"
                  component={DocumentsPage}
                />
                <Route
                  exact
                  path="/docschema/"
                  component={DocSchemaPage}
                />
              </Switch>
            </Content>
          </Main>

          <Footer />
        </Container>
    </Router>
  );
}

export default App;
