import React, { FC, Fragment, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { arrowleft, backward, forward } from "../../assets/icons";
import { GET_CONTENTNAME_BY_ID } from "../../graphql/queries";
import { Container, Row, Col, Center } from "../grid";
import { Navigation, UploadButton } from "./navbar.styles";
import { IRedirect, NavbarProps } from "./navbar.types";
import axios from "axios";
import Spiner from "../loaders/spiner";
import Swal from "sweetalert2";
import { useContent } from "../../context/ContentContext";
import { WisengineContent } from "../../../WisengineProvider";
import { selectTheme } from "../../theme";

const Navbar: FC<NavbarProps> = ({ style = {} }): JSX.Element | null => {
  const { setUploadProgress, uploadProgress } = useContent();
 const getParamId = (): string => {
    const path = window.location.href.split("/");
    return path[path.length - 1];
  };
  
  const paramId = getParamId();
  const { data } = useQuery(GET_CONTENTNAME_BY_ID, {
    variables: { ID: paramId },
  });
  const { config } = WisengineContent();

  const redirect: IRedirect = (path) => () => {
    window.location.href = path;
  };

  const redirectHarm = (path) => {
    console.log(path);
    window.location.href = `${path.split(":")[0]}${paramId.trim()}`;
  };

  const s3uploadService = async (file) => {
    const { value } = file.target;
    if (!value) return;
    try {
      const data = new FormData();
      data.append("file", value);
      const sendFile = await axios({
        method: "post",
        url: "https://devs.wisengine.co:8010/api/cmgt/s3",
        headers: {
          Authorization: `Api-Key ${localStorage.getItem("CMGT_TOKEN")}`,
        },
        data,
        onUploadProgress: (progress) => {
          const { loaded, total } = progress;
          let percent = Math.floor((loaded * 100) / total);
          setUploadProgress(percent);
        },
      });

      const sessionFiles = JSON.parse(sessionStorage.getItem("files"));

      if (sessionFiles) {
        sessionFiles.push(sendFile.data.data);
        sessionStorage.setItem("files", JSON.stringify(sessionFiles));
      } else {
        let files = [];
        files.push(sendFile.data.data);
        sessionStorage.setItem("files", JSON.stringify(files));
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  useEffect(() => {
    if (uploadProgress > 99) {
      Toast.fire({
        icon: "success",
        title: "Archivo subido correctamente",
      });
    }
  }, [uploadProgress]);

  const redirectHarmony = () => {
    localStorage.setItem("contentId", paramId.trim());
    const route = config.routes.viewer.replace(
      new RegExp(":id", "g"),
      paramId.trim()
    );
    window.location.href = route;
  };

  return (
    <Fragment>
      <div
        style={{
          width: `${uploadProgress}%`,
          height: `${
            uploadProgress === 0 || uploadProgress > 98 ? "0px" : "2px"
          }`,
          backgroundColor: selectTheme(config.theme).progressbar,
        }}
      ></div>
      <Navigation style={style}>
        <Container>
          <Row>
            <Col size={2}>
              <Row>
                <Col size={5} onClick={() => history.back()}>
                  <img src={arrowleft} alt="arrow-left" />
                  Volver
                </Col>
                <Col size={7}>
                  <img src={backward} alt="backward" />
                  <img src={forward} alt="forward" />
                </Col>
              </Row>
            </Col>
            <Col size={8}>
              <h1>
                {data?.getContent?.NAME.toUpperCase() ?? (
                  <Center>
                    {" "}
                    <Spiner />{" "}
                  </Center>
                )}
              </h1>
            </Col>
            <Col size={2}>
              <Row>
                <Col size={5} onClick={redirectHarmony}>
                  <span
                    style={{
                      border: "solid 1px #C4C4C4",
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      borderRadius: "4px",
                    }}
                  >
                    Guardar
                  </span>
                </Col>
                <Col size={7}>
                  <UploadButton>
                    <input
                      style={{ cursor: "pointer" }}
                      type="file"
                      aria-label="Archivo"
                      onChange={(e) =>
                        s3uploadService({
                          target: {
                            name: "FILE",
                            value: e.target.files[0],
                          },
                        })
                      }
                    />
                  </UploadButton>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Navigation>
    </Fragment>
  );
};

export default Navbar;
