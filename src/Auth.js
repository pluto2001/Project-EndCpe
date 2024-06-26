import React, { useEffect, useState } from "react";
import firebaseConfig from "./config";


function RealtimeData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const databaseRef = firebaseConfig.database().ref("user");
    databaseRef.on("value", (snapshot) => {
      setData(snapshot.val());
    });

    return () => {
      databaseRef.off();
    };
  }, []);

  return (
    <div>
      <h2>Realtime Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
export default RealtimeData;
