import axios from "axios";
import { Cookies } from "react-cookie";
import socketIOClient from "socket.io-client";
const apiKeyToken =
  "c08859711194e1ce2c9b99159cb889465b9d5aa7f7594434508d64f0e011500f";
const model = "nbd";
const URL_API = "https://devs.wisengine.co:8443";
const URL_SOCKET = "https://devs.wisengine.co:8080";
const URL_CMGT = "https://devs.wisengine.co:8010";

export function socketIoMessaging(user) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await socketIOClient(
        `${URL_SOCKET}/messaging?id=${user.ID}`
      );
      resolve(response);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function socketIoSession(user) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await socketIOClient(
        `${URL_SOCKET}/session?id=${user.ID}&token=${user.SESSION_TOKEN}`
      );
      resolve(response);
    } catch (e) {
      console.log("Socket:", e);
      reject(e.response || e);
    }
  });
}

export function socketIoChatIbm(user) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await socketIOClient(
        `${URL_SOCKET}/chatIbm?id=${user.ID}`
      );
      resolve(response);
    } catch (e) {
      console.log("Socket:", e);
      reject(e.response || e);
    }
  });
}

export function socketIoPresentations(userName, user, isInstructor) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await socketIOClient(
        `${URL_SOCKET}/presentations?name=${userName}&id=${user.ID}${
          isInstructor ? "&isInstructor=true" : ""
        }`
      );
      resolve(response);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function socketIoRPS(userName, user) {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await socketIOClient(
        `${URL_SOCKET}/rps?name=${userName}&id=${user.ID}`
      );
      resolve(response);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function dbservice(sql) {
  const cookies = new Cookies();
  //const token = cookies.get("token");
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsIkxPR0lOIjoiamhvYW5hZG1pbiIsIkVNQUlMIjoiamV2YXJnYXMxQGFrZWxhYi5vcmciLCJST0xFIjoiQWRtaW4iLCJMQU5HIjoiZW4iLCJMT0NBVElPTl9QSUNUVVJFIjoiaHR0cHM6Ly93aXNlbmdpbmUtbmJkLnMzLmFtYXpvbmF3cy5jb20vdXNlcnMvOTQ4ZWNiYTM5YzVkNWE2YjNjNTg0NDRlYjk5NjQxOWQ5Y2Y1ODNmNC0yLmpwZyIsIldFTENPTUUiOiJZIiwiU0VTU0lPTl9UT0tFTiI6IjkzOTZjMWNjZGU1ZmYwZThhNWQ1NTRlM2NiMzc4NDZjNGU1MWQ4N2YiLCJpYXQiOjE2ODQ1MDkxNTgsImV4cCI6MTY4NTg2NjM1OH0.c2-no7wEUZrT66q8sSq6pASypOyHCwzVnmh-FSkNJ3c";
  return new Promise(async (resolve, reject) => {
    try {
      const body = {
        model: model,
        sql: sql,
      };
      let response = await axios({
        url: `${URL_API}/dbservice`,
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        data: body,
      });
      resolve(response.data.data);
    } catch (e) {
      if (e.response?.status === 401) {
        console.log("Session Finished");
        cookies.remove("token");
        cookies.remove("user");
        document.location.href = "/";
      }
      reject(e.response || e);
    }
  });
}

export function execute(args) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  return new Promise(async (resolve, reject) => {
    try {
      const body = {
        model: model,
        args: args,
      };
      let response = await axios({
        url: `${URL_API}/execute`,
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        data: body,
      });
      resolve(response.data.data);
    } catch (e) {
      if (e.response.status === 401) {
        console.log("Session Finished");
        cookies.remove("token");
        cookies.remove("user");
        document.location.href = "/";
      }
      reject(e.response || e);
    }
  });
}

export function login(username, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `${URL_API}/api/auth/sign-in`,
        method: "POST",
        auth: {
          username,
          password,
        },
        withCredentials: true,
        data: {
          apiKeyToken: apiKeyToken,
          model: model,
        },
      });
      resolve(response);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export async function events(event, params, data) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  try {
    const response = await axios({
      url: `${URL_API}/nbd/events`,
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
      data: {
        model: model,
        event,
        params,
        data,
      },
    });
    return response;
  } catch (e) {
    if (e.response?.status === 401) {
      console.log("Session Finished");
      cookies.remove("token");
      cookies.remove("user");
      document.location.href = "/";
    }
    return e.response || e;
  }
}

export function checkUsername(username) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `${URL_API}/nbd/check-username`,
        method: "POST",
        data: {
          apiKeyToken: apiKeyToken,
          model: model,
          username,
        },
      });
      resolve(response);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function signUp(email, password, username) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `${URL_API}/nbd/sign-up`,
        method: "POST",
        data: {
          apiKeyToken: apiKeyToken,
          model: model,
          email,
          password,
          username,
        },
      });
      resolve(response);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function register(id_workshop, user_id) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `${URL_API}/nbd/pre-register`,
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        data: {
          model: model,
          id_workshop,
          user_id,
        },
      });
      resolve(response);
    } catch (e) {
      if (e.response.status === 401) {
        console.log("Session Finished");
        cookies.remove("token");
        cookies.remove("user");
        document.location.href = "/";
      }
      reject(e.respons || e);
    }
  });
}

export function InvitationCoaching(
  workshop_id,
  user_id,
  negotiation_id,
  newMember
) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `${URL_API}/nbd/invitation-coaching`,
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        data: {
          model: model,
          workshop_id,
          user_id,
          negotiation_id,
          newMember,
        },
      });
      resolve(response);
    } catch (e) {
      if (e.response.status === 401) {
        console.log("Session Finished");
        cookies.remove("token");
        cookies.remove("user");
        document.location.href = "/";
      }
      reject(e.respons || e);
    }
  });
}

export function subscribePushNotification(user, subscribeObject) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `${URL_API}/subscribeUser`,
        method: "POST",
        data: {
          model: model,
          user,
          subscribeObject,
        },
      });
      resolve(response);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function unsubscribePushNotification(user, endpoint) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `${URL_API}/unsubscribe-user`,
        method: "POST",
        data: {
          model: model,
          user,
          endpoint,
        },
      });
      resolve(response);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function sendNotification(user, payload_title, payload_body) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `${URL_API}/send-notificacion`,
        method: "POST",
        data: {
          model: model,
          user,
          payload_title,
          payload_body,
        },
      });
      resolve(response);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function recoverPassword(email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `${URL_API}/recover-password`,
        method: "POST",
        data: {
          apiKeyToken: apiKeyToken,
          model: model,
          email: email,
        },
      });
      resolve(response);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function validateResetToken(token) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `${URL_API}/validate-reset-token`,
        method: "POST",
        data: {
          apiKeyToken: apiKeyToken,
          model: model,
          token: token,
        },
      });
      resolve(response);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function resetPassword(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `${URL_API}/reset-password`,
        method: "POST",
        data: {
          apiKeyToken: apiKeyToken,
          model: model,
          email,
          password,
        },
      });
      resolve(response);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function updatePassword(email, password, newPassword) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `${URL_API}/update-password`,
        method: "POST",
        data: {
          apiKeyToken: apiKeyToken,
          model: model,
          email,
          password,
          newPassword,
        },
      });
      resolve(response);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function updateUsername(userId, newUserName) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `${URL_API}/update-username`,
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        data: {
          model: model,
          userId,
          newUserName,
        },
      });
      resolve(response);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function requestUpdateEmail(userId, newEmail) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `${URL_API}/request-update-email`,
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        data: {
          model: model,
          userId,
          newEmail,
        },
      });
      resolve(response);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function updateEmail(confirm, userId, token, email) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `${URL_API}/update-email`,
        method: "POST",
        data: {
          apiKeyToken: apiKeyToken,
          model: model,
          confirm,
          userId,
          token,
          email,
        },
      });
      resolve(response);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function createUser(
  firstname,
  lastname,
  identify,
  email,
  phone,
  city,
  baseLine,
  role
) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `${URL_API}/create-user-sanamente`,
        method: "POST",
        data: {
          apiKeyToken: apiKeyToken,
          model: model,
          firstname,
          lastname,
          identify,
          email,
          phone,
          city,
          baseLine,
          role,
        },
      });
      resolve(response);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export async function createSuggestions(userId, context, dictionary) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  try {
    const response = await axios({
      url: `${URL_API}/suggestion/context/${userId}`,
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      data: { context: context, dictionary: dictionary, model: model },
    });
    return response.data;
  } catch (e) {
    if (e.response.status === 401) {
      console.log("Session Finished");
      cookies.remove("token");
      cookies.remove("user");
      document.location.href = "/";
    }
    return e.response;
  }
}

export async function rcmProcess(userId, content, dictionary) {
  const cookies = new Cookies();
  //const token = cookies.get("token");
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsIkxPR0lOIjoiamhvYW5hZG1pbiIsIkVNQUlMIjoiamV2YXJnYXMxQGFrZWxhYi5vcmciLCJST0xFIjoiQWRtaW4iLCJMQU5HIjoiZW4iLCJMT0NBVElPTl9QSUNUVVJFIjoiaHR0cHM6Ly93aXNlbmdpbmUtbmJkLnMzLmFtYXpvbmF3cy5jb20vdXNlcnMvOTQ4ZWNiYTM5YzVkNWE2YjNjNTg0NDRlYjk5NjQxOWQ5Y2Y1ODNmNC0yLmpwZyIsIldFTENPTUUiOiJZIiwiU0VTU0lPTl9UT0tFTiI6IjkzOTZjMWNjZGU1ZmYwZThhNWQ1NTRlM2NiMzc4NDZjNGU1MWQ4N2YiLCJpYXQiOjE2ODQ1MDkxNTgsImV4cCI6MTY4NTg2NjM1OH0.c2-no7wEUZrT66q8sSq6pASypOyHCwzVnmh-FSkNJ3c";
  try {
    const response = await axios({
      url: `https://devs.wisengine.co:8443/rtf/process/${userId}`,
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      data: { content: content, dictionary: dictionary, model: model },
    });
    return response.data;
  } catch (e) {
    if (e.response.status === 401) {
      console.log("Session Finished");
      cookies.remove("token");
      cookies.remove("user");
      document.location.href = "/";
    }
    return e.response;
  }
}

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function sendTextChatBot(text, userId) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  try {
    const response = await axios({
      url: `${URL_API}/chatbot-send/${userId}`,
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      data: { text: text },
    });
    return response.data;
  } catch (e) {
    if (e.response.status === 401) {
      console.log("Session Finished");
      cookies.remove("token");
      cookies.remove("user");
      document.location.href = "/";
    }
    return e.response;
  }
}

export function uploadImageProfile(photo) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  photo.append("model", model);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `${URL_API}/upload-image-profile`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        data: photo,
      });
      resolve(response);
    } catch (e) {
      if (e.response.status === 401) {
        console.log("Session Finished");
        cookies.remove("token");
        cookies.remove("user");
        document.location.href = "/";
      }
      reject(e.response || e);
    }
  });
}

export function uploadImagesRcmEditor(formDataImage) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  formDataImage.append("model", model);
  return new Promise((resolve, reject) => {
    axios({
      url: `https://devs.wisengine.co:8443/upload-image-rcm`,
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      data: formDataImage,
    })
      .then((result) => {
        console.log(result.data.url);
        resolve(result.data.url);
      })
      .catch((e) => {
        if (e.response.status === 401) {
          console.log("Session Finished");
          cookies.remove("token");
          cookies.remove("user");
          document.location.href = "/";
        }
        reject(e.response || e);
      });
  });
}

export function uploadFile(photo) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  photo.append("model", model);
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        url: `${URL_API}/upload-file`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        data: photo,
      });
      resolve(response);
    } catch (e) {
      if (e.response.status === 401) {
        console.log("Session Finished");
        cookies.remove("token");
        cookies.remove("user");
        document.location.href = "/";
      }
      reject(e.response || e);
    }
  });
}

export function copyFileBucket(url_file, id, table, column) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  return new Promise(async (resolve, reject) => {
    try {
      const body = {
        model: model,
        url_file,
        id,
        table,
        column,
      };
      const response = await axios({
        url: `${URL_API}/copy-file-bucket`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        data: body,
      });
      resolve(response);
    } catch (e) {
      if (e.response.status === 401) {
        console.log("Session Finished");
        cookies.remove("token");
        cookies.remove("user");
        document.location.href = "/";
      }
      reject(e.response || e);
    }
  });
}

export function AwsComprehend(text) {
  return new Promise(async (resolve, reject) => {
    try {
      const body = { text };
      let response = await axios({
        url: `${URL_API}/machineLearning/comprehend`,
        method: "POST",
        data: body,
      });
      resolve(response.data);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function IbmComprehend(text) {
  return new Promise(async (resolve, reject) => {
    try {
      const body = { text };
      let response = await axios({
        url: `${URL_API}/machineLearning/ibm`,
        method: "POST",
        data: body,
      });
      resolve(response.data);
    } catch (e) {
      reject(e.response || e);
    }
  });
}
export function SurveyML(text) {
  return new Promise(async (resolve, reject) => {
    try {
      const body = { text };
      let response = await axios({
        url: `${URL_API}/machineLearning/survey`,
        method: "POST",
        data: body,
      });
      resolve(response.data);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function IbmEmotion(text) {
  return new Promise(async (resolve, reject) => {
    try {
      const body = { text };
      let response = await axios({
        url: `${URL_API}/machineLearning/ibm/emotion`,
        method: "POST",
        data: body,
      });
      resolve(response.data);
    } catch (e) {
      reject(e.response || e);
    }
  });
}
export function translateAws(text) {
  return new Promise(async (resolve, reject) => {
    try {
      const body = { text };
      let response = await axios({
        url: `${URL_API}/machineLearning/aws/translate`,
        method: "POST",
        data: body,
      });
      resolve(response.data);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function translateToAws(texts, langFrom, langTo) {
  return new Promise(async (resolve, reject) => {
    try {
      const body = { texts, langFrom, langTo };
      let response = await axios({
        url: `${URL_API}/machineLearning/aws/translateTo`,
        method: "POST",
        data: body,
      });
      resolve(response.data);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function traslateAws(text) {
  return new Promise(async (resolve, reject) => {
    try {
      const body = { text };
      let response = await axios({
        url: `${URL_API}/machineLearning/aws/translate`,
        method: "POST",
        data: body,
      });
      resolve(response.data);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function cognitiveIbm(text) {
  return new Promise(async (resolve, reject) => {
    try {
      const body = { text };
      let response = await axios({
        url: `${URL_API}/machineLearning/ibm/cognitive`,
        method: "POST",
        data: body,
      });
      resolve(response.data);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function personalityeIbm(text) {
  return new Promise(async (resolve, reject) => {
    try {
      const body = { text };
      let response = await axios({
        url: `${URL_API}/machineLearning/ibm/personality`,
        method: "POST",
        data: body,
      });
      resolve(response.data);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function personalityeIbmTwitter(text) {
  return new Promise(async (resolve, reject) => {
    try {
      const body = { text };
      let response = await axios({
        url: `${URL_API}/machineLearning/ibm/personality/twitter`,
        method: "POST",
        data: body,
      });
      resolve(response.data);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function transcribeIbm(text) {
  return new Promise(async (resolve, reject) => {
    try {
      const body = { text };
      let response = await axios({
        url: `${URL_API}/machineLearning/ibm/transcribe`,
        method: "POST",
        data: body,
      });
      resolve(response.data);
    } catch (e) {
      reject(e.response || e);
    }
  });
}

export function massiveEmail(
  subjectMail,
  subjectMailES,
  textMail,
  textMailES,
  mailTo,
  ids,
  dictionary
) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  return new Promise(async (resolve, reject) => {
    try {
      const body = {
        model,
        subjectMail,
        subjectMailES,
        textMail,
        textMailES,
        mailTo,
        ids,
        dictionary,
      };
      const response = await axios({
        url: `${URL_API}/nbd/massive-email`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        data: body,
      });
      resolve(response);
    } catch (e) {
      if (e.response.status === 401) {
        console.log("Session Finished");
        cookies.remove("token");
        cookies.remove("user");
        document.location.href = "/";
      }
      reject(e.response || e);
    }
  });
}

export async function insertAnswerSurvey(
  userId,
  surveyId,
  workshopId,
  sqlQuestions,
  sqlAnswers
) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  try {
    const response = await axios({
      url: `${URL_API}/nbd/insert-answer-survey`,
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
      data: {
        model: model,
        userId,
        surveyId,
        workshopId,
        sqlQuestions,
        sqlAnswers,
      },
    });
    return response;
  } catch (e) {
    if (e.response.status === 401) {
      console.log("Session Finished");
      cookies.remove("token");
      cookies.remove("user");
      document.location.href = "/";
    }
    return e.response || e;
  }
}

export async function mgPanel(node, param, userId) {
  try {
    const response = await axios({
      url: `${URL_API}/mgpanel`,
      method: "POST",
      data: {
        model: model,
        node,
        param,
        userId,
      },
    });
    return response.data;
  } catch (e) {
    return e.response || e;
  }
}

export async function DuplicateNegotiationService(
  user,
  id_negotiation,
  id_new_negotiation
) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  try {
    const response = await axios({
      url: `${URL_API}/nbd/duplicate-negotiation`,
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
      data: {
        model: model,
        user,
        id_negotiation,
        id_new_negotiation,
      },
    });
    return response;
  } catch (e) {
    if (e.response.status === 401) {
      console.log("Session Finished");
      cookies.remove("token");
      cookies.remove("user");
      document.location.href = "/";
    }
    return e.response || e;
  }
}

export async function HandleEvents(event_type, userId, params) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  try {
    const response = await axios({
      url: `${URL_API}/nbd/handle-events`,
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
      data: {
        model: model,
        event_type,
        userId,
        params,
      },
    });
    return response;
  } catch (e) {
    if (e.response?.status === 401) {
      console.log("Session Finished");
      cookies.remove("token");
      cookies.remove("user");
      document.location.href = "/";
    }
    return e.response || e;
  }
}
export async function updateWorkshopUser(
  userIdNewWorkshop,
  userId,
  newWorkshopId
) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  try {
    const response = await axios({
      url: `${URL_API}/nbd/update-workshop-user`,
      headers: { Authorization: `Bearer ${token}` },
      method: "POST",
      data: {
        model: model,
        userIdNewWorkshop,
        userId,
        newWorkshopId,
      },
    });
    return response;
  } catch (e) {
    if (e.response?.status === 401) {
      console.log("Session Finished");
      cookies.remove("token");
      cookies.remove("user");
      document.location.href = "/";
    }
    return e.response || e;
  }
}

export async function getContentsCMGT() {
  // TODO: Add authentication method
  try {
    const response = await axios({
      url: `${URL_CMGT}/api/cmgt`,
      method: "post",
      data: {
        query: `
          query getAllContents {
            getAllContents {
              ID
              NAME
              DESCRIPTION
              CATEGORY
              COVER
              CLIENT_ID
            }
          }
        `,
      },
    });
    // TODO: Remove this filter when the API is ready
    return response.data.data.getAllContents.filter(
      (content) => content.CLIENT_ID === 1
    );
  } catch {
    return [];
  }
}
