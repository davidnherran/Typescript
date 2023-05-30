import React, { useEffect, FC } from "react";
import Layout from "../components/layout";
import Segments from "../components/segments";
import Sidebar from "../components/sidebar";
import Wrapper from "../components/wrapper";
import Navbar from "../components/navbar";
import { ApolloProvider } from "@apollo/client";
import { GraphQLClient } from "../../shared/config";
import { OjoProvider } from "../utils/functions";
import { ThemeProvider } from "styled-components";
import { selectTheme } from "../theme";
import Modal from "../components/modal";
import NewSegment from "../components/forms/newSegment";
import { WisengineContent } from "../../WisengineProvider";
import { WrapperProps } from "../components/wrapper/wrapper.types";

const ContentManager: FC<Pick<WrapperProps, "isDndDisabled">> = ({
  isDndDisabled,
}) => {
  const { config } = WisengineContent();
  const [openModalNewSegment, setOpenModalNewSegment] = React.useState(false);

  const ƒcreateSegment = () => {
    setOpenModalNewSegment(true);
  };

  const ƒcloseModal = () => {
    setOpenModalNewSegment(false);
  };

  const getParamId = (): number => {
    const url: string = window.location.href;
    const params: string[] = url.split("/");
    let id: string = params[params.length - 1];

    return Number(id);
  };

  useEffect(() => {
    const paramId = getParamId();
    localStorage.setItem("contentId", paramId.toString());
  }, []);

  return (
    <ApolloProvider client={GraphQLClient}>
      <ThemeProvider theme={selectTheme(config.theme)}>
        <OjoProvider>
          <Layout>
            <Modal
              isOpen={openModalNewSegment}
              ƒcloseModal={ƒcloseModal}
              title="Nuevo segmento"
            >
              <NewSegment ƒcloseModal={ƒcloseModal} />
            </Modal>
            <div className="contentmanager">
              <Navbar />
              <Sidebar />
              <Wrapper
                ƒcreateSegment={ƒcreateSegment}
                isDndDisabled={isDndDisabled}
              >
                <Segments />
              </Wrapper>
            </div>
          </Layout>
        </OjoProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default ContentManager;
