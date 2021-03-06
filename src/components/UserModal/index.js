import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";
import { Form, Actions, Title } from "./styles";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

const propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  initialUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

const defaultProps = {
  initialUser: undefined,
};

export default function UserModal({
  title,
  isOpen,
  isLoading,
  initialUser,
  onCancel,
  onSave,
}) {
  const [user, setUser] = useState(INITIAL_STATE);
  const formRef = useRef();

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser);
    } else {
      setUser(INITIAL_STATE);
    }
  }, [initialUser]);

  function handleChange(event) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  function handleSave() {
    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }

    onSave(user);
    setUser(INITIAL_STATE);
  }

  function handleCancel() {
    setUser(INITIAL_STATE);
    onCancel();
  }

  return (
    <Modal isOpen={isOpen}>
      <Form ref={formRef}>
        <Title>{title}</Title>
        <Input.Label htmlFor="name">Nome</Input.Label>
        <Input
          id="name"
          name="name"
          placeholder="Nome"
          value={user.name}
          onChange={handleChange}
          required
          margin="0 0 20px 0"
        />
        <Input.Label htmlFor="email">Email</Input.Label>
        <Input
          id="email"
          placeholder="Email"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          required
          margin="0 0 20px 0"
        />
        <Input.Label htmlFor="password">Password</Input.Label>
        <Input
          id="password"
          placeholder="Password"
          name="password"
          type="password"
          value={user.password}
          onChange={handleChange}
          required={!initialUser}
          margin="0 0 20px 0"
        />
        <Actions>
          <Button variant="secondary" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button isLoading={isLoading} variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Actions>
      </Form>
    </Modal>
  );
}

UserModal.propTypes = propTypes;
UserModal.defaultProps = defaultProps;
