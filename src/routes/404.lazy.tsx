import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/404")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.errorCode}>404</h1>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "rgb(172 162 253)",
    margin: 0,
  },
  content: {
    textAlign: "center",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    width: "100%",
  },
  errorCode: {
    fontSize: "96px",
    fontWeight: "bold",
    color: "#e74c3c",
  },
  errorMessage: {
    fontSize: "20px",
    color: "#555",
    marginTop: "10px",
  },
  backHome: {
    display: "inline-block",
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#3498db",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
  backHomeHover: {
    backgroundColor: "#2980b9",
  },
};
