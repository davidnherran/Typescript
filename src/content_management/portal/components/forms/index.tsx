import React, { useState } from "react";
import { FButton } from "..";
import { useMutation } from "@apollo/client";
import { CREATE_CONTENT } from "../../../../shared/graphql/schema/mutations/content";
import uploadLoader from "../../assets/loaders/upload-loader.svg";
import axios from "axios";
import "./contents.css";

const FormNewContent = ({ openModal, content }): TElement => {
  const [createContent] = useMutation(CREATE_CONTENT);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [newContent, setNewContent] = useState({
    name: "",
    description: "",
    cover:
      "https://ambientarsa.com/wp-content/uploads/2021/11/placeholder-721.png",
    clientId: Number(1),
    category: "",
    appName: 1,
  });

  const createCollection = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    createContent({
      variables: {
        NAME: newContent.name,
        DESCRIPTION: newContent.description,
        CATEGORY: newContent.category,
        COVER: file,
      },
    }).then((res) => {
      window.location.href = `/cmgt/editor/${res?.data.createContent.id}`;
    });
  };

  const onChange = (e) => {
    setNewContent({ ...newContent, [e.target.name]: e.target.value });
  };

  const s3uploadService = async (file) => {
    const { value } = file.target;
    if (!value) return;
    setLoading(true);
    try {
      const data = new FormData();
      data.append("file", value);
      const sendFile = await axios({
        method: "post",
        url: "https://devs.wisengine.co:8010/api/cmgt/s3",
        headers: {
          Authorization:
            "Api-Key fa1f81db751038013828cb4e37979ae32133862ceb8c0e050320e2744f02c594",
        },
        data,
      });
      setFile(sendFile.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={createCollection}>
      <div className="cp input__container">
        <label>Nombre</label>
        <input
          className="cp input"
          name="name"
          type="text"
          placeholder="Escribe el título del contenido"
          onChange={(e) => {
            onChange(e);
          }}
          autoComplete="off"
          required={true}
        />
      </div>
      <div className="cp input__container">
        <label>Descripción</label>
        <input
          className="cp input"
          type="text"
          name="description"
          placeholder="Escribe la descripción del contenido"
          onChange={(e) => {
            onChange(e);
          }}
          autoComplete="off"
          required={true}
        />
      </div>
      <div className="cp input__container">
        <label>Categoría</label>
        <input
          list="Categoría"
          name="category"
          placeholder="Escribe la categoría del contenido"
          onChange={(e) => {
            onChange(e);
          }}
          required={true}
          autoComplete="off"
        />
        <datalist id="Categoría">
          {content !== undefined &&
            content.length > 0 &&
            content
              ?.filter(
                (thing, index, self) =>
                  index === self.findIndex((t) => t.CATEGORY === thing.CATEGORY)
              )
              .map((category, index) => (
                <option
                  key={index}
                  value={category.CATEGORY}
                  style={{ width: "100%" }}
                />
              ))}
        </datalist>
      </div>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        {loading ? (
          <img src={uploadLoader} alt="progress" />
        ) : (
          <div className={`cp ${file ? "input__file-success" : "input__file"}`}>
            <input
              type="file"
              autoComplete="off"
              accept="image/*"
              onChange={(e) =>
                s3uploadService({
                  target: {
                    name: "FILE",
                    value: e.target.files[0],
                  },
                })
              }
            />
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "24px",
        }}
      >
        <FButton onClick={openModal}>Cancelar</FButton>
        <FButton
          type="submit"
          //disabled={!uploadedCover}
        >
          Crear
        </FButton>
      </div>
    </form>
  );
};

export default FormNewContent;
