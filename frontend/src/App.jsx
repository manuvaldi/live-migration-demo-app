import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io({
  timeout: 2000,          // 2 segundos para la conexión inicial
  reconnectionAttempts: 3, // opcional: reintenta 3 veces
  reconnectionDelay: 1000
});

export default function App() {
  const [d, setD] = useState({
    value: "",
    cpu: 0,
    mem: 0,
    host: "",
    time: ""
  });

  useEffect(() => {
    socket.on("update", setD);
    return () => socket.off("update");
  }, []);

  return (
    <div style={styles.page}>
      {/* Contenedor centrado */}
      <div style={styles.container}>
        {/* Logo y título */}
        <div style={styles.header}>
          <img
            src="https://www.redhat.com/cms/managed-files/Brand_Standars-Red_Hat-_color_on-darkgray.svg"
            alt="Red Hat Logo"
            style={styles.logoImg}
          />
          <h1 style={styles.title}>Live Migration Monitor</h1>
          <div style={styles.subtitle}>Realtime VM Observability</div>
        </div>

        {/* Tarjetas en fila horizontal */}
        <div style={styles.row}>
          <Card title="SYSTEM">
            <Metric label="Hostname" value={d.host} />
            <Metric label="Time" value={d.time} />
          </Card>

          <Card title="OPENSHIFT CLUSTER">
            <div style={styles.fileBox}>{d.value || "—"}</div>
          </Card>

          <Card title="RESOURCES">
            <BigMetric label="CPU Usage" value={`${d.cpu}%`} />
            <BigMetric label="Memory Usage" value={`${d.mem}%`} />
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------- UI Components ---------- */
function Card({ title, children }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardTitle}>{title}</div>
      {children}
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div style={styles.metric}>
      <span style={styles.metricLabel}>{label}</span>
      <span style={styles.metricValue}>{value}</span>
    </div>
  );
}

function BigMetric({ label, value }) {
  return (
    <div style={styles.bigMetric}>
      <div style={styles.bigValue}>{value}</div>
      <div style={styles.bigLabel}>{label}</div>
    </div>
  );
}

/* ---------- Styles ---------- */
const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    background: "radial-gradient(circle at top, #2b0f14, #020617 60%)",
    fontFamily: "'Red Hat Display', 'Segoe UI', system-ui, sans-serif",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#f8fafc",
    overflow: "hidden"
  },

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "40px"
  },

  header: {
    textAlign: "center"
  },

  logoImg: {
    height: "60px",
    marginBottom: "12px"
  },

  title: {
    fontSize: "3rem",
    fontWeight: 700,
    margin: 0
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: "1.2rem",
    marginTop: "6px"
  },

  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap"
  },

  card: {
    background: "linear-gradient(145deg, #020617, #09090b)",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    border: "1px solid #1f2933",
    minWidth: "240px",
    textAlign: "center"
  },

  cardTitle: {
    fontSize: "0.85rem",
    letterSpacing: "1.5px",
    color: "#f43f5e",
    marginBottom: "16px",
    fontWeight: 700
  },

  metric: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    fontSize: "1rem"
  },

  metricLabel: {
    color: "#94a3b8"
  },

  metricValue: {
    fontWeight: 600
  },

  bigMetric: {
    marginBottom: "16px"
  },

  bigValue: {
    fontSize: "3rem",
    fontWeight: 800,
    color: "#f43f5e",
    lineHeight: 1.1
  },

  bigLabel: {
    fontSize: "0.9rem",
    color: "#94a3b8",
    letterSpacing: "1px"
  },

  fileBox: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#38bdf8",
    wordBreak: "break-word"
  }
};
