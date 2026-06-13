const express = require("express");
const app = express();

app.use(express.json());

const users = [
  { id: 1, name: "Amit", email: "amit@test.com" },
  { id: 2, name: "Riya", email: "riya@test.com" }
];

const notes = [
  { id: 1, title: "Note 1", content: "Content 1", userId: 1 },
  { id: 2, title: "Note 2", content: "Content 2", userId: 2 }
];

app.get("/users", (req, res) => {
  const allUsers = users;
  res.send(allUsers)
}); //done

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  // const user = users.find(u => u.id === Number(id));
  const user = getUserById(id)

  if(!user){
    return res.send({message: "User not found"})
  }
  res.send(user);
}); //done

function getUserById(id) {
  const user = users.find(u => u.id === Number(id));
  return user
} //done

app.get("/notes/count", (req, res) => {
  const total = notes.length;
  res.send({ total });
}); //done

function fetchExternalData() {
  return new Promise((resolve) => {
    setTimeout(()=>{
      resolve("External data fetched")
    },1000)
  })
}

app.get("/external-data", async (req, res) => {
  const data = await fetchExternalData();
  res.send(data);
}); //done

app.get("/notes", (req, res) => {
  if (notes.length === 0) {
    return res.send({message: "No notes found"});
  }
  res.send(notes);
}); //done

function generateNoteId() {
  return Math.floor(Math.random() * 1000) ;
}

// const newId = generateNoteId();

app.post("/notes", (req, res) => {
  const { title, content, userId } = req.body;
  const newId = generateNoteId();
  

  if(!title || title.trim() === ""){
    return res.send({message: "Title is required and cannot be empty"})
  }
  if(!content){
    return res.send({message: "Content is required"})
  }
  if(!userId || isNaN(Number(userId))){
    return res.send({message: "Userid is required"})
  }

  const existingUser = users.find(u => u.id === Number(userId))

  if(!existingUser){
    return res.send({message: "User not found"})
  }

  // if (!title || !content ) {
  //   return res.send("Invalid input");
  // }

  const newNote = {
    id: newId,
    title: title,
    content: content,
    userId: Number(userId)
  };

  notes.push(newNote);
  res.send(newNote);
}); //done

app.delete("/notes/:id", (req, res) => {
  const id = Number(req.params.id);

  if(isNaN(id)){
    return res.send({ message: "Invalid Id" });
  }
  const noteIndex = notes.findIndex(n => n.id === id);

  if(noteIndex !== -1){
      notes.splice(noteIndex, 1);
      return res.send({ message: "Note deleted" });
  }

  res.send({ message: "No note to delete" });
}); //done

app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;

  const user = users.find(u => u.id === id);

  if(!user){
    return res.send({message : "User not found"});
  }

  if(!name || name.trim() === ""){
    return res.send({message : "Name is empty, provide a name"});
  }

  user.name = name;

  res.send(user);
}); //done

app.get("/user-notes/:userId", (req, res) => {
  const userId = Number(req.params.userId);
  const userNotes = notes.filter(n => n.userId === userId);
  res.send(userNotes);
}); //done

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@test.com" && password === "123456") {
    res.send({ message: "Login successful" });
  } else {
    res.send({ message: "Invalid credentials" });
  }
}); //done

app.get("/profile/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if(!user){
    return res.send({message: "User not found"})
  }
  res.send(user.name);
}); //done

app.post("/sum", (req, res) => {
  const { a, b } = req.body;
  

  if(isNaN(Number(a)) || isNaN(Number(b))){
    return res.send({message: "Invalid input"})
  }
  
  const total = Number(a) + Number(b);
  res.send({ total });
}); //done

app.listen(5000, () => {
  console.log("Server running on port 5000");
});