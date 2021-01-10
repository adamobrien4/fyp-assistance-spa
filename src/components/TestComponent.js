import React, { useEffect, useState } from "react";
import axiosGraph from "../Axios";
import { useMsal } from "@azure/msal-react";

function TestComponent() {
  const { instance, accounts } = useMsal();

  var [axiosGraphInstance, setAxiosGraphInstance] = useState(null);

  const account = accounts[0] || null;

  axiosGraph(instance, accounts[0]).then((res) => {
    setAxiosGraphInstance(res);
  });

  return (
    <div>
      <button
        onClick={() =>
          axiosGraphInstance
            .get("/me")
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
        }
      >
        Test
      </button>
    </div>
  );
}

export default TestComponent;
