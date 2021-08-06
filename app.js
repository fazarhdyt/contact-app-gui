const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadContact, findContact } = require("./utils/contacts");

const app = express();
const port = 3000;

// gunakan ejs
app.set("view engine", "ejs");

// third-party middleware
app.use(expressLayouts);

// built-in middleware
app.use(express.static("public"));

app.get("/", function (req, res) {
  const mahasiswa = [
    {
      nama: "fazar",
      email: "fajar@gmail.com",
    },
    {
      nama: "mada",
      email: "mada@gmail.com",
    },
    {
      nama: "stip",
      email: "stip@gmail.com",
    },
  ];
  res.render("index", {
    title: "Halaman Home",
    nama: "fazar hidayat",
    mahasiswa,
    layout: "layouts/main-layout",
  });
});

app.get("/about", function (req, res) {
  res.render("about", {
    layout: "layouts/main-layout",
    title: "Halaman About",
  });
});

app.get("/contact", function (req, res) {
  const contacts = loadContact();

  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
    contacts,
  });
});

app.get("/contact/:nama", function (req, res) {
  const contact = findContact(req.params.nama);

  res.render("detail", {
    title: "Halaman Detail Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`menjalankan web server melalui port http://localhost:${port}`);
});
