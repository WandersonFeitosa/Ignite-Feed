import { PencilLine } from "phosphor-react";
import { FormEvent, useState } from "react";
import { Avatar } from "./Avatar";

import styles from "./Sidebar.module.css";

interface SidebarProps {
  name: string;
  role: string;
  githubUser: string;
  updateUser: Function;
}
export function Sidebar({ name, role, githubUser, updateUser }: SidebarProps) {
  function handleuptadeUser(event: any) {
    event.preventDefault();
    const form = event.target;
    const newUser = {
      name: form.name.value,
      role: form.role.value,
      githubUser: form.githubUser.value,
    };

    updateUser(newUser);
  }

  const [profileButton, setProfileButton] = useState(styles.profileButton);
  const [formWrapper, setFormSidebar] = useState(styles.formWrapper);

  function handleToggleProfileUpdate() {
    if (profileButton == styles.profileButton) {
      setProfileButton(styles.activeProfileButton);
      setFormSidebar(styles.activeFormWrapper);
    } else {
      setProfileButton(styles.profileButton);
      setFormSidebar(styles.formWrapper);
    }
  }

  return (
    <div>
      <aside className={styles.sidebar}>
        <img
          className={styles.cover}
          src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
          alt=""
        />

        <div className={styles.profile}>
          <Avatar githubUser={githubUser} />

          <strong>{name}</strong>
          <span>{role}</span>
        </div>

        <footer>
          <a onClick={handleToggleProfileUpdate} className={profileButton}>
            <PencilLine size={20} />
            Editar seu perfil
          </a>
        </footer>
      </aside>
      <aside className={formWrapper}>
        <form className={styles.formSidebar} onSubmit={handleuptadeUser}>
          <input type="text" name="name" placeholder="Nome" required />
          <input type="text" name="role" placeholder="Cargo" required />
          <input
            type="text"
            name="githubUser"
            placeholder="Usuário Github"
            required
          />
          <button type="submit">Atualizar dados</button>
        </form>
      </aside>
    </div>
  );
}
