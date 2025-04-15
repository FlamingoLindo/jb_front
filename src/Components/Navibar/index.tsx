import React from "react";
import Link from "next/link";

import { FaDollarSign, FaProductHunt, FaUser } from "react-icons/fa";

export default function NaviBar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "220px",
        height: "100vh",
        backgroundColor: "#333",
        color: "#fff",
        padding: "1rem",
        boxSizing: "border-box",
        overflowY: "auto",
        borderRadius: "0 10px 10px 0",
      }}
    >
      <div style={{ marginBottom: "2rem", textAlign: "center", fontSize: "2rem", textShadow: "1px 1px 10px #000" }}>
        <h2>JB</h2>
      </div>

      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        <li style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
          <FaProductHunt style={{ marginRight: "0.5rem" }} />
          <Link href="/">
            Produtos
          </Link>
        </li>

        <li style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
          <FaDollarSign style={{ marginRight: "0.5rem" }} />
          <Link href="/table">
            Tabela de valores
          </Link>
        </li>

        <li style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
          <FaUser style={{ marginRight: "0.5rem" }} />
          <Link href="/users">
            Usuários
          </Link>
        </li>
      </ul>
    </nav>
  );
}

//https://github.com/Mestres-da-Web/motorfind-web-cliente/tree/develop/src/app