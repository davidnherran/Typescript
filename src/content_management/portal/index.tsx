import React, { useState, useEffect } from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { Modal, FormNewContent, SButton, Cover, Dropdown } from "./components";
import { SearchBar, Sidebar, Wrapper, Skeleton } from "./components";
import { selectTheme } from "./theme";
import { WisengineContent } from "../../WisengineProvider";
import { Container, NotContent } from "./components/container";

const ContentPortal = (content: IContentPortal): TElement => {
  const [contents, setContents] = useState<IContentPortal["content"]>([]);
  const { config: { theme, customColor, graphQl, token } } = WisengineContent();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(!isOpen);

  useEffect(() => {
    setContents(content.content);
  }, [content]);

  const handleSearch = (value: string) => {
    if (value) {
      const newContents = contents.filter((item) =>
        item.NAME.toString()
          .toLowerCase()
          .normalize("NFD")
          .includes(value.toLowerCase().normalize("NFD"))
      );
      setContents(newContents);
    } else {
      setContents(content.content);
    }
  };

  const graphQlClient = new ApolloClient({
    uri: graphQl.uri,
    cache: new InMemoryCache(),
    headers: { "Authorization": `Api-Key ${token}` }
  });

  return (
    <ApolloProvider client={graphQlClient}>
      <ThemeProvider theme={selectTheme(theme)}>

        <Modal isOpen={isOpen} title="Nuevo contenido">
          <FormNewContent openModal={openModal} {...content} />
        </Modal>

        <Sidebar customColor={customColor}>
          <Dropdown {...content} />
        </Sidebar>

        <Wrapper>
          <SearchBar handleSearch={handleSearch} />
          <Container>
            {content.content.length < 0 ? ( <Skeleton /> )
            : contents.length <= 0 ? (
              <NotContent>
                <h1>No se encontraron contenidos</h1>
              </NotContent>
            ) : (
              contents?.map((item) => <Cover {...item} key={item.ID} />)
            )}
          </Container>
          {theme !== "harmony" && (
            <SButton onClick={openModal} customColor={customColor}>
              Crear
            </SButton>
          )}
        </Wrapper>

      </ThemeProvider>
    </ApolloProvider>
  );
};

export default ContentPortal;
