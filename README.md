L’objectif est de renforcer la sécurité de notre application en contrôlant la navigation, afin de restreindre l’accès à certaines pages lorsque cela s’avère nécessaire.

# Route Guard

### **Le composant PrivateRoute**

```javascript
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const auth = { token: true };
  return auth.token ? <Outlet /> : <Navigate to="/" />;
}
```

Ce composant a pour rôle de protéger certaines routes de votre application en vérifiant si l'utilisateur est authentifié avant de lui permettre d'y accéder.

### **Utilisation du PrivateRoute**

```jsx
<Routes>
  <Route path="/" element={<HomePage />}>
    {" "}
  </Route>

  <Route element={<PrivateRoute />}>
    <Route
      path="/contact"
      element={<ContactPage handleSubmitMessage={handleSubmitMessage} />}
    />
    <Route path="/message" element={<MessagePage messages={messages} />} />
    <Route path="/message/:idMessage" element={<MessageDetailPage />} />
  </Route>

  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

La route parent utilise `<PrivateRoute /> `comme élément.
Les routes enfants ( `/contact , /message , /message/:idMessage` ) sont imbriquées à l'intérieur.
Lorsque l'utilisateur essaie d'accéder à l'une de ces routes, React Router passe d'abord par le composant

`PrivateRoute`
Si l'utilisateur n'est pas authentifié, il est redirigé vers la page d'accueil

# Not Found Page

Une page "NotFound" est un outil essentiel pour gérer les erreurs de navigation de manière élégante, en aidant les utilisateurs à rester engagés avec votre site et en minimisant les impacts négatifs sur l'expérience utilisateur et le SEO.

**Amélioration de l'Expérience Utilisateur**:

- Lorsqu'un utilisateur accède à un lien brisé ou à une URL qui n'existe pas dans votre application, afficher une page "NotFound" personnalisée est plus convivial que de simplement présenter une erreur générique ou une page blanche. Cela indique à l'utilisateur qu'il a atteint une partie non valide du site mais reste dans le contexte de votre application.

1. **Orientation et Assistance**:
   - Une bonne page "NotFound" offre des options pour aider l'utilisateur à se réorienter. Elle peut inclure des liens vers la page d'accueil, une barre de recherche, ou d'autres ressources utiles. Cela aide les utilisateurs à trouver ce qu'ils cherchent sans trop de frustration.
2. **Maintien de l'Image de Marque et du Design**:
   - Même dans les erreurs de navigation, il est important de maintenir l'image de marque et le design de votre site. Une page "NotFound" bien conçue s'assure que même les erreurs offrent une expérience utilisateur cohérente avec le reste de votre site.
3. **Analyse et Correction d'Erreurs**:
   - La surveillance des erreurs de navigation peut fournir des informations précieuses. Si vous constatez que les utilisateurs atteignent fréquemment la page "NotFound" à partir d'une certaine URL, cela peut indiquer un lien brisé ou une erreur dans votre site que vous devez corriger.
4. **SEO (Optimisation pour les moteurs de recherche)**:
   - Les pages "NotFound" correctement gérées sont également importantes pour le SEO. Les moteurs de recherche pénalisent les sites avec de nombreux liens brisés. Une page "NotFound" bien gérée peut minimiser cet impact négatif.
5. **Conformité avec les Bonnes Pratiques du Web**:
   - La gestion des erreurs est une partie essentielle du développement web. Une page "NotFound" fait partie des bonnes pratiques de développement, montrant que vous gérez correctement les scénarios d'erreur.

```typescript
<Routes>
  <Route path="/" element={<HomePage />} />
  // Le petit astérisque prendra toute les pages non existantes
  <Route path="*" element={<NotFoundPage />} />
</Routes>
```

# Layout

### ==Qu’est-ce qu’un Layout en React ?==

Dans une application web, un « layout » correspond à la structure globale de l’interface.

Par exemple :

- **Une entête** (header) qui affiche le nom du site, le menu de navigation, etc.
- **Un pied de page** (footer) qui inclut des informations légales, des liens vers les réseaux sociaux, etc.
- **Une zone de contenu principal** au milieu (ou sur le côté) pour la partie dynamique de la page (les articles, les formulaires, les listings, etc.).

En React, on parle souvent de _Layout Components_ pour désigner des composants à haut niveau qui servent avant tout de « coquille » pour la page : entête, menu, footer, container principal, etc. Ils permettent de définir une structure réutilisable pour l’ensemble de l’application ou d’une section de l’application.

### ==Pourquoi utiliser des Layouts en React ?==

**Réutilisation** : Éviter de réécrire le code du header ou du footer à chaque page.

**Lisibilité** : Séparer clairement la structure (Layout) de la logique applicative ou du contenu.

**Maintenabilité** : Appliquer plus facilement des modifications globales, par exemple changer la couleur du menu ou le style global en un seul endroit.

**Cohérence** : Offrir la même expérience utilisateur et la même présentation d’une page à l’autre.

**Exemple**

```jsx
import React from "react";
import { Outlet } from "react-router-dom";

function DefaultLayout() {
  return (
    <div className="default-layout">
      <header>
        <h1>Mon Application</h1>
        {/* Ici, on peut placer un menu de navigation, un logo, etc. */}
      </header>

      <main>
        {/* <Outlet> est l'emplacement où s'affichera la page enfant */}
        <Outlet />
      </main>

      <footer>
        <p>© 2025 - Mon Application</p>
      </footer>
    </div>
  );
}
```

#### Que fait <Outlet> ?

`<Outlet>` agit comme un « trou » ou un « point d’injection ». Lorsqu’une route enfant correspond à l’URL, son composant sera rendu là où se trouve `<Outlet>`

**Application coté route ( avec 2 layouts) :**

```jsx
// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layouts/DefaultLayout";
import AdminLayout from "./layouts/AdminLayout";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout par défaut */}
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          {/* D'autres routes publiques... */}
        </Route>

        {/* Layout Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Sous-routes du layout admin */}
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          {/* D'autres routes admin... */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

# Utilisation Axios

Axios est un client HTTP _[basé sur les promesses](https://fr.javascript.info/promise-basics)_ compatible avec node.js et les navigateurs.
Il est _[isomorphique](https://www.lullabot.com/articles/what-is-an-isomorphic-application)_ (c’est à dire qu’il peut opérer dans le navigateur et dans node.js avec le même code).
Côté serveur, il utilise le module natif http de node.js, et côté client (navigateur) il utilise les XMLHttpRequests.

En JavaScript, une "promesse" (Promise) est un objet qui représente une valeur qui peut ne pas être disponible immédiatement, mais le sera peut-être à l'avenir. Les promesses sont utilisées pour gérer des opérations asynchrones, telles que des requêtes réseau, des lectures de fichiers, etc. Une promesse peut se trouver dans un de ces trois états :

- **En attente** (_pending_) : L'opération n'est pas encore terminée.
- **Résolue** (_fulfilled_) : L'opération s'est terminée avec succès et la promesse a une valeur.
- **Rejetée** (_rejected_) : L'opération a échoué et la promesse a une raison d'échec.

Le mot-clé **async** est utilisé pour déclarer une fonction comme asynchrone. Cela signifie que la fonction peut exécuter des opérations asynchrones et retournera une promesse. L'avantage des fonctions async est qu'elles permettent d'utiliser le mot-clé await à l'intérieur, simplifiant ainsi la syntaxe pour manipuler des promesses.

Le mot-clé **await** est utilisé pour attendre la résolution d'une promesse à l'intérieur d'une fonction async. Quand await est utilisé, il fait en sorte que la fonction asynchrone attende que la promesse soit résolue ou rejetée avant de continuer son exécution. Cela rend le code asynchrone plus lisible et plus simple à écrire, car il ressemble davantage à une séquence d'opérations synchrone.

![](/api/attachments.redirect?id=9d26935d-fe8f-4e71-8436-1560a4bf2322)

##

**I) Installation**

Pour l’utiliser il nous faut installer le package axios que l’on trouvera ici :
<https://www.npmjs.com/package/axios>

##

II) **Utilisation :**

Dans notre cas nous avons créé un dossier spécifique dans notre projet : **services/api/todos**
L’objectif est de centraliser nos fonctions puis de les utiliser dans les pages que l’on souhaite

```typescript
import axios from "axios";

export async function getTodos() {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getTodoById(id: any) {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
```

Ici nous souhaitons charger notre page, d’une liste de todos, au moment ou celle-ci est montée.
Ainsi nous traitons avec cette requête dans le useEffect.

Néanmoins si nous souhaitons charger les données depuis un événement utilisateur nous pouvons utiliser getTodos dans une fonction spécifique.

```typescript
import { useEffect, useState } from "react";
import { getTodoById, getTodos } from "../../services/api/todo";

export default function HomePage() {
  const [todos, setTodos] = useState<any>([]);

  useEffect(() => {
    console.log("Je suis dans le useEffect");

    async function loadTodos() {
      const todos = await getTodos();
      setTodos(todos);
    }

    async function loadTodobyId() {
      const myTodo = await getTodoById(idMessage);
      console.log(myTodo);
    }

    loadTodos();
    loadTodobyId();
  }, []);

  async function submitMessage() {
    const todos = await getTodos();
    setTodos(todos);
  }

  return (
    <>
      <h1> Home Page</h1>

      <p> Ceci est la page d'accueil</p>

      <button onClick={submitMessage}> Charger les données </button>
    </>
  );
}
```
