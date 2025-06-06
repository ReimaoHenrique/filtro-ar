"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "./ContactCard.module.css";
import { BtnWhatsapp } from "@/app/components/bntWhatsapp/bntWhatsapp";
import { NotificationPopup } from "@/app/components/NotificationPopup/NotificationPopup";
import { ContactButtons } from "@/app/components/ContactButtons/ContactButtons";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  isWhatsapp: boolean;
  allowWhatsappContact: boolean;
}

interface NotificationState {
  isVisible: boolean;
  message: string;
  type: "success" | "error";
}

export function ContactCard() {
  const [contactOption, setContactOption] = useState<"email" | "whatsapp">(
    "whatsapp"
  );
  const [showEmailMessage, setShowEmailMessage] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    isWhatsapp: false,
    allowWhatsappContact: false,
  });
  const [notification, setNotification] = useState<NotificationState>({
    isVisible: false,
    message: "",
    type: "success",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (name === "phone") {
      setFormData((prev) => ({
        ...prev,
        isWhatsapp: false,
        allowWhatsappContact: false,
      }));
    }
  };

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({
      isVisible: true,
      message,
      type,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showNotification("Por favor, insira seu nome", "error");
      return;
    }

    if (!formData.message.trim()) {
      showNotification("Por favor, insira sua mensagem", "error");
      return;
    }

    if (!formData.email.trim() && !formData.phone.trim()) {
      showNotification(
        "Por favor, insira seu email ou número de telefone",
        "error"
      );
      return;
    }

    // TODO: Implementar envio do formulário
    console.log("Formulário enviado:", formData);
    showNotification("Funcionalidade ainda não implementada", "error");

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
      isWhatsapp: false,
      allowWhatsappContact: false,
    });
  };

  const handleContactOptionChange = (option: "email" | "whatsapp") => {
    if (option === "email") {
      setShowEmailMessage(true);
      setTimeout(() => {
        setShowEmailMessage(false);
      }, 1000);
      return;
    }
    setContactOption(option);
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (notification.isVisible) {
      timeoutId = setTimeout(() => {
        setNotification((prev) => ({ ...prev, isVisible: false }));
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [notification.isVisible]);

  const renderEmailForm = () => (
    <form onSubmit={handleSubmit} className={styles.contactForm}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Nome *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Seu nome completo"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="email">Email (opcional)</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="seu.email@empresa.com.br"
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="phone">Telefone (opcional)</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="(00) 00000-0000"
        />
      </div>

      {formData.phone && (
        <div className={styles.whatsappOptions}>
          <div className={styles.radioQuestion}>
            <p>Este número é WhatsApp?</p>
            <div className={styles.radioGroup}>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="isWhatsappYes"
                  name="isWhatsapp"
                  checked={formData.isWhatsapp === true}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isWhatsapp: true,
                    }))
                  }
                />
                <label htmlFor="isWhatsappYes">Sim</label>
              </div>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="isWhatsappNo"
                  name="isWhatsapp"
                  checked={formData.isWhatsapp === false}
                  onChange={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isWhatsapp: false,
                    }))
                  }
                />
                <label htmlFor="isWhatsappNo">Não</label>
              </div>
            </div>
          </div>

          {formData.isWhatsapp && (
            <div className={styles.radioQuestion}>
              <p>Podemos entrar em contato pelo WhatsApp?</p>
              <div className={styles.radioGroup}>
                <div className={styles.radioOption}>
                  <input
                    type="radio"
                    id="allowWhatsappContactYes"
                    name="allowWhatsappContact"
                    checked={formData.allowWhatsappContact === true}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        allowWhatsappContact: true,
                      }))
                    }
                  />
                  <label htmlFor="allowWhatsappContactYes">Sim</label>
                </div>
                <div className={styles.radioOption}>
                  <input
                    type="radio"
                    id="allowWhatsappContactNo"
                    name="allowWhatsappContact"
                    checked={formData.allowWhatsappContact === false}
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        allowWhatsappContact: false,
                      }))
                    }
                  />
                  <label htmlFor="allowWhatsappContactNo">Não</label>
                </div>
              </div>
              {formData.allowWhatsappContact && (
                <div className={styles.whatsappButtonContainer}>
                  <p className={styles.whatsappMessage}>
                    Clique no botão abaixo para iniciar uma conversa no
                    WhatsApp:
                  </p>
                  <BtnWhatsapp isActive={true} />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className={styles.formGroup}>
        <label htmlFor="message">Mensagem *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Como podemos ajudar sua empresa?"
        ></textarea>
      </div>

      <motion.button
        type="submit"
        whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
        whileTap={{ scale: 0.95 }}
        className={styles.button}
      >
        Enviar Mensagem
      </motion.button>
    </form>
  );

  const renderWhatsappContact = () => (
    <div className={styles.whatsappContact}>
      <div className={styles.whatsappContainer}>
        <p className={styles.whatsappText}>
          Entre em contato diretamente pelo WhatsApp para um atendimento mais
          rápido:
        </p>
        <div className={styles.whatsappButtonWrapper}>
          <BtnWhatsapp isActive={true} />
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.contactCard}>
      <NotificationPopup
        isVisible={notification.isVisible}
        message={notification.message}
        type={notification.type}
        onClose={() =>
          setNotification((prev) => ({ ...prev, isVisible: false }))
        }
      />

      {showEmailMessage && (
        <div className={styles.emailMessage}>
          <span>Função temporariamente indisponível</span>
        </div>
      )}

      <ContactButtons
        contactOption={contactOption}
        onOptionChange={handleContactOptionChange}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={styles.contactContent}
      >
        {contactOption === "email"
          ? renderEmailForm()
          : renderWhatsappContact()}
      </motion.div>
    </div>
  );
}
