function showInput(selectedInput) {
  // Hide all inputs
  document.getElementById("quantidade").classList.add("hidden");

  // Show the selected input
  if (selectedInput) {
    document.getElementById(selectedInput).classList.remove("hidden");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let sleepForm = document.getElementById("sleepForm");
  if (sleepForm) {
    sleepForm.addEventListener("submit", function (event) {
      event.preventDefault();

      // Coletar dados do formulário
      const dormir = document.getElementById("dormir").value;
      const acordar = document.getElementById("acordar").value;
      const quantidade = document.getElementById("quantidade").value;
      const estado = document.getElementsByName("estado").value;

      // Calcular diferença entre horas de dormir e acordar
      const dormirTime = new Date(`1970-01-01T${dormir}:00`);
      const acordarTime = new Date(`1970-01-01T${acordar}:00`);
      let diff = (acordarTime - dormirTime) / (1000 * 60 * 60);
      if (diff < 0) {
        diff += 24;
      }

      // Analisar a qualidade do sono
      let horaSono;
      if (diff >= 8) {
        horaSono = "boa";
      } else if (diff >= 5) {
        horaSono = "média";
      } else {
        horaSono = "ruim";
      }

      // Analisar os despertares noturnos
      let despertares;
      if (quantidade == 1) {
        despertares = "poucos";
      } else if (quantidade == 1 && estado == "leve") {
        despertares = "meio termo";
      } else if (quantidade == 2 && estado == "leve") {
        despertares = "muitos";
      } else if (quantidade == 2) {
        despertares = "meio termo";
      } else if (quantidade >= 3) {
        despertares = "muitos";
      }

      // Determinar o status do sono
      let statusSono;
      if (horaSono === "boa" && despertares === "poucos") {
        statusSono = "bom";
      } else if (horaSono === "média" && despertares === "meio termo") {
        statusSono = "médio";
      } else if (horaSono === "ruim" && despertares === "muitos") {
        statusSono = "ruim";
      } else if (horaSono === "boa" && despertares === undefined) {
        statusSono = "bom";
      } else if (horaSono === "média" && despertares === undefined) {
        statusSono = "médio";
      } else if (horaSono === "ruim" && despertares === undefined) {
        statusSono = "ruim";
      }

      // Guardar os dados no localStorage
      localStorage.setItem("dormir", dormir);
      localStorage.setItem("acordar", acordar);
      localStorage.setItem("quantidade", quantidade);
      localStorage.setItem("estado", estado);
      localStorage.setItem("horaSono", horaSono);
      if (despertares == undefined) {
        despertares = "não informado";
      }
      localStorage.setItem("despertares", despertares);
      localStorage.setItem("statusSono", statusSono);

      // Redirecionar para a página de relatório
      window.location.href = "relatorio.html";
    });
  }

  let createNoteButton = document.getElementById("createNoteButton");
  if (createNoteButton) {
    createNoteButton.addEventListener("click", function () {
      document.getElementById("noteSection").classList.toggle("hidden");
    });
  }

  let saveNoteButton = document.getElementById("saveNoteButton");
  if (saveNoteButton) {
    saveNoteButton.addEventListener("click", function () {
      const noteContent = document.getElementById("noteContent").value;
      if (noteContent) {
        saveNoteToLocalStorage(noteContent);
        document.getElementById("noteContent").value = ""; // Limpar a caixa de texto
        document.getElementById("noteSection").classList.add("hidden");
        displayNotes();
      }
    });
  }

  // Função para salvar anotação no localStorage
  function saveNoteToLocalStorage(content) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push({ content: content, date: new Date().toLocaleString() });
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  // Função para exibir as anotações
  function displayNotes() {
    const notesList = document.getElementById("notesUl");
    if (notesList) {
      notesList.innerHTML = "";
      let notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes.forEach((note) => {
        const li = document.createElement("li");
        li.textContent = `${note.date}: ${note.content}`;
        notesList.appendChild(li);
      });
    }
  }

  // Exibir as anotações ao carregar a página
  let notesPage = document.getElementById("notesList");
  if (notesPage) {
    displayNotes();
  }

  const editSleepForm = document.getElementById("editSleepForm");
  // Função para carregar dados existentes
  function loadSleepData() {
    const dormir = localStorage.getItem("dormir");
    const acordar = localStorage.getItem("acordar");
    const quantidade = localStorage.getItem("quantidade");
    const estado = localStorage.getItem("estado");

    if (dormir) {
      document.getElementById("dormir").value = dormir;
    }
    if (acordar) {
      document.getElementById("acordar").value = acordar;
    }
    if (quantidade) {
      document.getElementById("quantidade").value = quantidade;
    }
    if (estado) {
      document.querySelectorAll('input[name="estado"]').forEach((input) => {
        if (input.value === estado) {
          input.checked = true;
        }
      });
    }
  }

  // Função para salvar dados editados
  function saveSleepData(event) {
    event.preventDefault();

    const dormir = document.getElementById("dormir").value;
    const acordar = document.getElementById("acordar").value;
    const quantidade = document.getElementById("quantidade").value;
    const estado = document.querySelector('input[name="estado"]:checked').value;

    localStorage.setItem("dormir", dormir);
    localStorage.setItem("acordar", acordar);
    localStorage.setItem("quantidade", quantidade);
    localStorage.setItem("estado", estado);

    // Recalcular a qualidade do sono e o status
    const dormirTime = new Date(`1970-01-01T${dormir}:00`);
    const acordarTime = new Date(`1970-01-01T${acordar}:00`);
    let diff = (acordarTime - dormirTime) / (1000 * 60 * 60);
    if (diff < 0) {
      diff += 24;
    }

    let horaSono;
    if (diff >= 8) {
      horaSono = "boa";
    } else if (diff >= 5) {
      horaSono = "média";
    } else {
      horaSono = "ruim";
    }

    let despertares;
    if (quantidade == 1) {
      despertares = "poucos";
    } else if (quantidade == 1 && estado == "leve") {
      despertares = "meio termo";
    } else if (quantidade == 2 && estado == "leve") {
      despertares = "muitos";
    } else if (quantidade == 2) {
      despertares = "meio termo";
    } else if (quantidade >= 3) {
      despertares = "muitos";
    }

    let statusSono;
    if (horaSono === "boa" && despertares === "poucos") {
      statusSono = "bom";
    } else if (horaSono === "média" && despertares === "meio termo") {
      statusSono = "médio";
    } else if (horaSono === "ruim" && despertares === "muitos") {
      statusSono = "ruim";
    } else if (horaSono === "boa" && despertares === undefined) {
      statusSono = "bom";
    } else if (horaSono === "média" && despertares === undefined) {
      statusSono = "médio";
    } else if (horaSono === "ruim" && despertares === undefined) {
      statusSono = "ruim";
    }

    localStorage.setItem("horaSono", horaSono);
    if (despertares == undefined) {
      despertares = "não informado";
    }
    localStorage.setItem("despertares", despertares);
    localStorage.setItem("statusSono", statusSono);

    alert("Dados de sono atualizados com sucesso!");
  }

  // Carregar dados ao inicializar a página
  if (editSleepForm) {
    loadSleepData();
  }
  // Adicionar evento ao formulário de edição

  if (editSleepForm) {
    editSleepForm.addEventListener("submit", saveSleepData);
  }

  // Funções para gerenciar metas
  const goalForm = document.getElementById("goalForm");
  if (goalForm) {
    goalForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const goalDescription = document.getElementById("goalDescription").value;
      const goalDeadline = document.getElementById("goalDeadline").value;
      const goalType = document.getElementById("goalType").value;

      saveGoalToLocalStorage(goalDescription, goalDeadline, goalType);
      displayGoals();
      goalForm.reset();
    });
  }

  function saveGoalToLocalStorage(description, deadline, type) {
    let goals = JSON.parse(localStorage.getItem("goals")) || [];
    goals.push({
      description: description,
      deadline: deadline,
      type: type,
      dateAdded: new Date().toLocaleString(),
    });
    localStorage.setItem("goals", JSON.stringify(goals));
  }

  function displayGoals() {
    const goalsList = document.getElementById("goalsList");
    if (goalsList) {
      goalsList.innerHTML = "";
      let goals = JSON.parse(localStorage.getItem("goals")) || [];
      goals.forEach((goal) => {
        const li = document.createElement("li");
        li.textContent = `Meta: ${goal.description}, Prazo: ${goal.deadline} semanas, Tipo: ${goal.type}, Adicionada em: ${goal.dateAdded}`;
        goalsList.appendChild(li);
      });
    }
  }

  // Exibir as metas ao carregar a página
  if (goalForm) {
    displayGoals();
  }
});
