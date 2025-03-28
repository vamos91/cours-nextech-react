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

# Tandstack Query

La doc de TanQuery -→ <https://tanstack.com/query/latest>

1/ Installer TanQuery -→ `npm i @tanstack/react-query`

2/ Installer QueryDevTool -→ `npm i @tanstack/react-query-devtools`

3/ Wrapper App dans le main.tsx

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./hooks/contexts/user.context.tsx";

// Importer le QueryClient et QueryClientProvider
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Instancier un new QueryClient
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <App />
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

4/ Ajouter la ReactQueryDevtools dans notre App.tsx afin d’avoir notre petit palmier ( =) ) :

```typescript
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<PrivateRoute />}>
          <Route
            path="/contact"
            element={<ContactPage handleSubmitMessage={handleSubmitMessage} />}
          />
          <Route
            path="/message"
            element={<MessagePage messages={messages} />}
          />
          <Route path="/message/:idMessage" element={<MessageDetailPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <ReactQueryDevtools />
    </>
  );
}

export default App;
```

5/ Utilisation de use Query dans notre page Home.tsx:

```typescript
import { getTodoById, getTodos, createTodo } from "../../services/api/todos";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export default function HomePageUseQuery() {
  const queryClient = useQueryClient();

  // Pour faire des appels GET
  const { data, isLoading, isError, refetch } = useQuery<Todo[]>({
    // Ici nous donnons un id à notre requête
    queryKey: ["todos"],
    // Nous appelons la requête qui doit se trouver dans notre dossier api
    queryFn: () => getTodos(),
    // Le slateTime c'est le temps en ms que notre appel gardera en cache
    // Si il est à 0, il n'y aura pas de cache, si nous ne mettons rien le cache durera 5 minutes
    staleTime: 0,
  });

  // Pour faire des appels POST, PUT, PATCH, DELETE
  const addTodo = useMutation({
    // Le body correspond à dans la function addNewTodo
    mutationFn: (body: Todo) => createTodo(body),
    // newTodo correspond à la réponse rendu par l'api
    onSuccess: (newTodo: Todo) => {
      // Ici nous récupérons la valeur de todos de notre useQuery
      const currentTodos: Todo[] = data || [];
      // Nous faisons le push avec la nouvelle information
      const updatedTodos = [...currentTodos, newTodo];
      //  const updatedTodos = [...(data || []), newTodo];
      // Ici nous ajoutons la liste actualisé
      queryClient.setQueryData(["todos"], updatedTodos);
    },
    // gestion des erreurs
    onError: (error: any) => {
      console.error("Erreur", error);
      alert("Erreur lors de l’ajout de la Todo");
    },
  });

  async function addNewTodo() {
    const body: Todo = {
      id: 201,
      title: "Test",
      completed: true,
      userId: 1,
    };
    // Pour éxecuter la mutation
    addTodo.mutate(body);
  }

  // Version sans le useMutation
  async function addNewTodo2() {
    const body: Todo = {
      id: 201,
      title: "Test",
      completed: true,
      userId: 1,
    };

    const newTodo = await createTodo(body);
    const currentTodos: Todo[] = data || [];
    const updatedTodos = [...currentTodos, newTodo.body];
    queryClient.setQueryData(["todos"], updatedTodos);
  }

  async function getTodoDetail(id: number) {
    try {
      const detailTodo = await getTodoById(id);
      console.log(detailTodo);
    } catch (err) {
      // Géstion des erreurs
    }
  }

  return (
    <>
      <h1> Page d'accueil </h1>

      <button onClick={addNewTodo}> Ajouter une Todo </button>

      {isLoading && <span>Loading...</span>}
      {isError && <span>Erreur</span>}
      {data &&
        data?.map((todo: Todo) => (
          <div key={todo.id}>
            - {todo.title} --
            <button onClick={() => getTodoDetail(todo.id)}>
              {" "}
              Log le detail{" "}
            </button>
          </div>
        ))}
    </>
  );
}
```

6/ Mes appels de l’api

```typescript
import axios from "axios";
import { Todo } from "../../pages/Home/HomePageUseQuery";
/* Methode */

// GET
// POST
// PUT
// PATCH
// DELETE

export async function getTodos() {
  try {
    const { data } = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getTodoById(id: number) {
  try {
    const { data } = await axios.get(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function createTodo(body: Todo) {
  try {
    const { data } = await axios.post(
      `https://jsonplaceholder.typicode.com/todos`,
      { body }
    );
    return data.body;
  } catch (error: any) {
    throw new Error(error);
  }
}
```

# Hook : useContext

Le hook useContext en React est un outil très utile pour accéder aux données d'un contexte. Un contexte, créé à l'aide de createContext, permet de partager des données à travers l'arbre des composants sans avoir à les passer explicitement à chaque niveau via des props.

##

I) **Création du userContext**

```typescript
import { createContext, useState, ReactNode } from "react";

// On crée d'abord le type pour le contexte utilisateur
interface UserContextType {
  user: string;
  updateUser: (username: string) => void;
}

// Le type "ReactNode" est utilisé pour représenter tout ce qui peut être rendu dans React
interface UserProviderType {
  children: ReactNode;
}

// On initialise le contexte avec un type UserContextType ou undefined
// (le contexte peut être initialisé à vide)
const UserContext = createContext<UserContextType>({
  user: "",
  updateUser: () => {},
});

export function UserProvider({ children }: UserProviderType) {
  const [user, setUser] = useState<string>("");

  function updateUser(username: string) {
    console.log("coucou context");
    setUser(username);
  }

  return (
    /*  Ce composant spécial permet de fournir la valeur user et la fonction updateUser 
        à tous les composants descendants de UserProvider qui consomment ce contexte. */

    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
```

##

2. **Wrapper le App**

Pour que App puisse hériter des fonctionnalités de UserProvider nous devons le wrapper avec ce dernier

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./hooks/contexts/user.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

##

**3) Utilisation du contexte dans les pages**

```typescript
export default function HomePage() {
  const [title, setTitle] = useState<any>("");
  const [todos, setTodos] = useState<any>([]);

  const { user, updateUser } = useContext(UserContext);

  return (
    <>
      <h1> Home Page</h1>

      <p> Ceci est la page d'accueil</p>

      <p> {user} </p>

      <button onClick={submitMessage}> Test du useContext </button>
    </>
  );
}
```

# Projet Deezer

### Exercice Fullstack React, Express et Prisma pour Développeur Confirmé : **Clone de Deezer**

#### Objectifs :

Créer un clone fonctionnel de l'application **Deezer** en utilisant **React** pour le front-end, **Express** pour le back-end, et **Prisma** pour la gestion de la base de données. L'application doit permettre à un utilisateur de rechercher de la musique, de lire des morceaux, d'ajouter des morceaux à une playlist, et de gérer sa propre bibliothèque musicale.

#### Technologies utilisées :

- **Front-end** : React (avec React Router pour la navigation et Axios pour les appels API).
- **Back-end** : Express (pour créer une API RESTful).
- **Base de données** : Prisma avec une base de données relationnelle (comme PostgreSQL ou MySQL).
- **Authentification** : JWT (JSON Web Tokens) pour la gestion de la session utilisateur.

#### Spécifications de l'application :

L'application doit permettre de réaliser les fonctionnalités suivantes :

1. **Gestion des utilisateurs** :
   - Inscription et connexion via JWT.
   - Affichage du profil utilisateur avec ses playlists et morceaux favoris.
2. **Gestion des morceaux de musique** :
   - Recherche de morceaux (utilisation d'une API tierce comme l'API Deezer ou une base de données simulée).
   - Lecture en streaming de morceaux de musique (via une API externe comme Deezer ou en simulant un lecteur audio).
   - Affichage de la liste des morceaux avec leurs informations (titre, artiste, album, etc.).
3. **Playlists et favoris** :
   - Création de playlists personnelles.
   - Ajout, suppression de morceaux à une playlist.
   - Ajout de morceaux aux favoris.
4. **Interface utilisateur** :
   - Page d'accueil avec une barre de recherche pour trouver des morceaux.
   - Page de profil avec les playlists et les morceaux favoris.
   - Lecteur de musique intégré avec une interface pour lire, mettre en pause,
   - Bonus : naviguer entre les morceaux.

---

### Étape 1 : Création du Back-End avec Express et Prisma

1. **Initialisation du projet Express** :

   - Créez un dossier server pour le back-end.
   - Initialisez un projet Node.js dans ce dossier :

     Copier

     ```javascript
     npm init -y

     ```

   - Installez les dépendances nécessaires :

     Copier

     ```javascript
     npm install express prisma @prisma/client jsonwebtoken bcryptjs cors body-parser

     ```

2. **Initialisation de Prisma** :

   - Exécutez la commande suivante pour initialiser Prisma :Copier

     ```javascript
     npx prisma init

     ```

   - Configurez votre base de données dans le fichier .env. Par exemple, pour Mysql :

     Copier

     ```javascript
     DATABASE_URL = "mysql://user:password@localhost:5432/deezer_clone";
     ```

3. **Schéma de la base de données** : Dans prisma/schema.prisma, définissez les modèles pour les utilisateurs, morceaux, et playlists :

   ```javascript
   prisma;
   ```

   Copier

   ```javascript
   datasource db {
     provider = "mysql"
     url      = env("DATABASE_URL")
   }

   generator client {
     provider = "prisma-client-js"
   }

   model User {
     id        Int       @id @default(autoincrement())
     email     String    @unique
     password  String
     playlists Playlist[]
     favorites Track[]
   }

   model Track {
     id        Int       @id @default(autoincrement())
     title     String
     artist    String
     album     String
     url       String
     playlists Playlist[]
     users     User[]    @relation("FavoriteTracks")
   }

   model Playlist {
     id        Int       @id @default(autoincrement())
     name      String
     userId    Int
     user      User      @relation(fields: [userId], references: [id])
     tracks    Track[]
   }

   ```

   Ensuite, générez et appliquez la migration pour créer les tables dans votre base de données :

   Copier

   ```javascript
   npx prisma migrate dev --name init
   npx prisma generate

   ```

4. **Création des routes API avec Express** :

   - **Authentification** : Créez des routes pour l'inscription et la connexion des utilisateurs avec JWT.

     Copier

     ```javascript
     // server/routes/auth.js
     const express = require("express");
     const bcrypt = require("bcryptjs");
     const jwt = require("jsonwebtoken");
     const prisma = require("../prismaClient");

     const router = express.Router();

     // Inscription
     router.post("/register", async (req, res) => {
       const { email, password } = req.body;
       const hashedPassword = await bcrypt.hash(password, 10);
       try {
         const user = await prisma.user.create({
           data: { email, password: hashedPassword },
         });
         res.status(201).json({ message: "User registered successfully" });
       } catch (error) {
         res.status(500).json({ message: "Error registering user" });
       }
     });

     // Connexion
     router.post("/login", async (req, res) => {
       const { email, password } = req.body;
       const user = await prisma.user.findUnique({ where: { email } });
       if (!user)
         return res.status(400).json({ message: "Invalid credentials" });

       const isPasswordCorrect = await bcrypt.compare(password, user.password);
       if (!isPasswordCorrect)
         return res.status(400).json({ message: "Invalid credentials" });

       const token = jwt.sign({ userId: user.id }, "secret", {
         expiresIn: "1h",
       });
       res.json({ token });
     });

     module.exports = router;
     ```

   - **Gestion des morceaux et playlists** : Créez des routes pour gérer les morceaux, les playlists, et les favoris.

     Copier

     ```javascript
     // server/routes/playlist.js
     const express = require("express");
     const jwt = require("jsonwebtoken");
     const prisma = require("../prismaClient");

     const router = express.Router();

     // Middleware pour vérifier le JWT
     const authenticate = (req, res, next) => {
       const token = req.header("Authorization");
       if (!token) return res.status(401).json({ message: "Unauthorized" });

       jwt.verify(token, "secret", (err, decoded) => {
         if (err) return res.status(401).json({ message: "Unauthorized" });
         req.userId = decoded.userId;
         next();
       });
     };

     // Ajouter un morceau à une playlist
     router.post("/:playlistId/tracks", authenticate, async (req, res) => {
       const { playlistId } = req.params;
       const { trackId } = req.body;
       const track = await prisma.track.findUnique({ where: { id: trackId } });
       const playlist = await prisma.playlist.update({
         where: { id: parseInt(playlistId) },
         data: {
           tracks: {
             connect: { id: track.id },
           },
         },
       });
       res.json(playlist);
     });

     module.exports = router;
     ```

5. **Démarrer le serveur Express** : Créez un fichier server.js pour configurer et démarrer le serveur Express.

   Copier

   ```javascript
   // server/server.js
   const express = require("express");
   const cors = require("cors");
   const bodyParser = require("body-parser");
   const authRoutes = require("./routes/auth");
   const playlistRoutes = require("./routes/playlist");

   const app = express();
   const port = 5000;

   app.use(cors());
   app.use(bodyParser.json());
   app.use("/auth", authRoutes);
   app.use("/playlists", playlistRoutes);

   app.listen(port, () => {
     console.log(`Server running on http://localhost:${port}`);
   });
   ```

---

### Étape 2 : Création du Front-End avec React

1. **Initialisation de l'application React** :

   - Créez un dossier client pour l'application React.
   - Initialisez une application React avec create-react-app :

     Copier

     ```javascript
     npm create vite@latest

     ```

   - Installez les dépendances nécessaires :

     Copier

     ```javascript
     npm install axios react-router-dom

     ```

2. **Gestion des routes et authentification** : Utilisez **React Router** pour la navigation entre les pages (inscription, connexion, profil utilisateur, recherche de musique).
3. **Création des composants React** :
   - **Composant de recherche de musique** : Utilisez Axios pour interagir avec une API (Deezer API ou une API personnalisée).
   - **Composant de lecteur de musique** : Créez un lecteur intégré avec des contrôles pour lire, mettre en pause, et naviguer entre les morceaux.
   - **Composant de gestion des playlists** : Permet à l'utilisateur d'ajouter, supprimer des morceaux dans ses playlists et d'ajouter des morceaux aux favoris.
4. **Gestion de l'état global** : Utilisez **React Context API** ou **Redux** pour gérer l'état global de l'application, en particulier pour les utilisateurs, playlists, et morceaux favoris.

---

### Conclusion :

L'exercice consiste à développer un **clone de Deezer** en utilisant **React**, **Express**, et **Prisma**. Vous devez créer une API complète avec gestion des utilisateurs, playlists, morceaux de musique et favoris, et intégrer cette API avec un front-end React interactif. Cette application comprendra également l'authentification via JWT et l'intégration avec une base de données relationnelle via Prisma.
