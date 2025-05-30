"use client";

import { motion } from "framer-motion";
import styles from "./about.module.css";
import { SimpleMemberCard } from "../../../components/MemberCard/MemberCard";
import teamData from "../../../data/teamData.json";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function About() {
  return (
    <section id="sobre" className={styles.about + " section"}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.sectionTitle}
        >
          Sobre Nós
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto 3rem",
          }}
        >
          A AirTech nasceu da visão de transformar ambientes industriais em
          espaços mais saudáveis e produtivos. Nossa equipe de especialistas
          combina conhecimento técnico e paixão por inovação para desenvolver
          soluções que realmente fazem a diferença na qualidade do ar e na vida
          das pessoas.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={styles.teamGrid}
        >
          {teamData.teamMembers.map((member) => (
            <motion.div key={member.name} variants={itemVariants}>
              <SimpleMemberCard
                name={member.name}
                role={member.role}
                image={member.image}
                description={member.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
