// let people = JSON.parse(localStorage.getItem("people")) || [];

// // ---------- HOME SCREEN ----------
// if (document.getElementById("peopleList")) {
//   const peopleList = document.getElementById("peopleList");
//   const totalGivenEl = document.getElementById("totalGiven");
//   const totalReceivedEl = document.getElementById("totalReceived");
//   const netBalanceEl = document.getElementById("netBalance");
//   const addPersonBtn = document.getElementById("addPersonBtn");
//   const personModal = document.getElementById("personModal");

//   const saveData = () => localStorage.setItem("people", JSON.stringify(people));

//   function openModal(modal) { modal.style.display = "flex"; }
//   function closeModal(modal) { modal.style.display = "none"; }

//   document.querySelectorAll(".cancel").forEach(btn => btn.onclick = () => closeModal(personModal));
//   addPersonBtn.onclick = () => openModal(personModal);

//   document.getElementById("savePerson").onclick = () => {
//     const name = document.getElementById("personName").value.trim();
//     if (!name) return alert("Enter a name");
//     people.push({ id: Date.now(), name, transactions: [] });
//     saveData();
//     closeModal(personModal);
//     render();
//   };

//   function calcBalances() {
//     let totalGiven = 0, totalReceived = 0;
//     people.forEach(p => {
//       let balance = 0;
//       p.transactions.forEach(t => balance += t.type === "received" ? t.amount : -t.amount);
//       p.balance = balance;
//       if (balance < 0) totalGiven += Math.abs(balance);
//       else totalReceived += balance;
//     });
//     totalGivenEl.textContent = `₹${totalGiven}`;
//     totalReceivedEl.textContent = `₹${totalReceived}`;
//     netBalanceEl.textContent = `₹${totalReceived - totalGiven}`;
//   }

//   function render() {
//     peopleList.innerHTML = "";
//     calcBalances();
//     people.forEach(p => {
//       const div = document.createElement("div");
//       div.className = "person";
//       div.innerHTML = `
//         <div class="person-info">
//           <h4>${p.name}</h4>
//           <small>${p.transactions.length} transactions</small>
//         </div>
//         <div class="balance ${p.balance >= 0 ? "positive" : "negative"}">₹${p.balance}</div>
//       `;
//       div.onclick = () => {
//         localStorage.setItem("currentPersonId", p.id);
//         location.href = "person.html";
//       };
//       peopleList.appendChild(div);
//     });
//   }

//   render();
// }

// // ---------- PERSON DETAIL PAGE ----------
// if (document.getElementById("txnList")) {
//   const personId = Number(localStorage.getItem("currentPersonId"));
//   const person = people.find(p => p.id === personId);
//   const txnList = document.getElementById("txnList");
//   const addTxnBtn = document.getElementById("addTxnBtn");
//   const txnModal = document.getElementById("txnModal");
//   const deletePersonBtn = document.getElementById("deletePersonBtn");

//   document.getElementById("personName").textContent = person.name;

//   const saveData = () => {
//     localStorage.setItem("people", JSON.stringify(people));
//     renderTransactions();
//   };

//   const openModal = modal => modal.style.display = "flex";
//   const closeModal = modal => modal.style.display = "none";
//   document.querySelectorAll(".cancel").forEach(btn => btn.onclick = () => closeModal(txnModal));
//   addTxnBtn.onclick = () => openModal(txnModal);
//   document.getElementById("backBtn").onclick = () => history.back();

//   // Delete entire person
//   deletePersonBtn.onclick = () => {
//     const confirmDelete = confirm(`Are you sure you want to delete "${person.name}" and all their transactions?`);
//     if (confirmDelete) {
//       people = people.filter(p => p.id !== personId);
//       localStorage.setItem("people", JSON.stringify(people));
//       alert("Person deleted successfully!");
//       location.href = "index.html";
//     }
//   };

//   document.getElementById("saveTxn").onclick = () => {
//     const type = document.getElementById("txnType").value;
//     const amount = parseFloat(document.getElementById("txnAmount").value);
//     const note = document.getElementById("txnNote").value;
//     const dateTime = document.getElementById("txnDateTime").value || new Date().toISOString();
//     if (!amount) return alert("Enter amount");

//     person.transactions.push({ id: Date.now(), type, amount, note, dateTime });
//     closeModal(txnModal);
//     saveData();
//   };

//   function renderTransactions() {
//     txnList.innerHTML = "";
//     if (!person.transactions.length) {
//       txnList.innerHTML = "<p style='text-align:center;color:#777'>No transactions yet</p>";
//       return;
//     }

//     const grouped = {};
//     person.transactions.forEach(t => {
//       const day = new Date(t.dateTime).toDateString();
//       if (!grouped[day]) grouped[day] = [];
//       grouped[day].push(t);
//     });

//     Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a)).forEach(day => {
//       const label = document.createElement("div");
//       label.className = "date-label";
//       const today = new Date().toDateString();
//       label.textContent = (day === today) ? "Today" : new Date(day).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
//       txnList.appendChild(label);

//       grouped[day].forEach(t => {
//         const div = document.createElement("div");
//         div.className = "txn";
//         div.innerHTML = `
//           <div class="top">
//             <div class="amount ${t.type}">${t.type === "given" ? "↑" : "↓"} ₹${t.amount}</div>
//             <div class="time">${new Date(t.dateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
//           </div>
//           ${t.note ? `<div class="note">${t.note}</div>` : ""}
//           <button class="delete-btn" data-id="${t.id}">Delete</button>
//         `;
//         txnList.appendChild(div);
//       });
//     });

//     // Delete transaction logic
//     document.querySelectorAll(".delete-btn").forEach(btn => {
//       btn.onclick = () => {
//         const txnId = Number(btn.dataset.id);
//         if (confirm("Delete this transaction?")) {
//           person.transactions = person.transactions.filter(t => t.id !== txnId);
//           saveData();
//         }
//       };
//     });
//   }

//   renderTransactions();
// }

/* ===== Protection wrapper: paste at the top of script.js ===== */
(function () {
  // disable right click
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  // disable copy / cut / paste events globally (except inputs are allowed to type)
  ['copy', 'cut', 'paste'].forEach(evt => {
    document.addEventListener(evt, function (e) {
      // allow inside inputs and textareas
      const tag = e.target && e.target.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      e.preventDefault();
    });
  });

  // block selection start (allow on inputs)
  document.addEventListener('selectstart', function (e) {
    const tag = e.target && e.target.tagName;
    if (tag !== 'INPUT' && tag !== 'TEXTAREA') e.preventDefault();
  });

  // block common developer tools shortcuts
  document.addEventListener('keydown', function (e) {
    const key = e.key.toUpperCase();
    if (
      key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (key === 'I' || key === 'J')) ||
      (e.ctrlKey && (key === 'U' || key === 'S'))
    ) {
      e.preventDefault();
      e.stopPropagation();
      // optional UX feedback:
      showBlockedToast();
    }
  });

  // prevent dragging images or anchors
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
  });

  // mobile long-press prevention: if touch longer than 600ms, cancel
  let touchStart = 0;
  document.addEventListener('touchstart', function (e) { touchStart = Date.now(); }, { passive: true });
  document.addEventListener('touchend', function (e) {
    const dt = Date.now() - touchStart;
    if (dt >= 600) {
      e.preventDefault();
      showBlockedToast();
    }
  });

  // small toast to give user quick feedback when blocked
  function showBlockedToast() {
    if (document.getElementById('blocked-toast')) return;
    const t = document.createElement('div');
    t.id = 'blocked-toast';
    t.textContent = 'Action blocked';
    Object.assign(t.style, {
      position: 'fixed',
      bottom: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'rgba(0,0,0,0.75)',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: '8px',
      zIndex: 10001,
      fontSize: '13px',
      pointerEvents: 'none'
    });
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 900);
  }
})();
/* ===== End protection wrapper ===== */

let people = JSON.parse(localStorage.getItem("people")) || [];

// ---------- HOME SCREEN ----------
if (document.getElementById("peopleList")) {
  const peopleList = document.getElementById("peopleList");
  const totalGivenEl = document.getElementById("totalGiven");
  const totalReceivedEl = document.getElementById("totalReceived");
  const netBalanceEl = document.getElementById("netBalance");
  const addPersonBtn = document.getElementById("addPersonBtn");
  const personModal = document.getElementById("personModal");

  const saveData = () => localStorage.setItem("people", JSON.stringify(people));

  function openModal(modal) {
    modal.style.display = "flex";
  }

  function closeModal(modal) {
    modal.style.display = "none";
  }

  document.querySelectorAll(".cancel").forEach((btn) => (btn.onclick = () => closeModal(personModal)));
  addPersonBtn.onclick = () => openModal(personModal);

  document.getElementById("savePerson").onclick = () => {
    const name = document.getElementById("personName").value.trim();
    if (!name) return alert("Enter a name");
    people.push({ id: Date.now(), name, transactions: [] });
    saveData();
    closeModal(personModal);
    render();
  };

  function calcBalances() {
    let totalGiven = 0,
      totalReceived = 0;
    people.forEach((p) => {
      let balance = 0;
      p.transactions.forEach(
        (t) => (balance += t.type === "received" ? t.amount : -t.amount)
      );
      p.balance = balance;
      if (balance < 0) totalGiven += Math.abs(balance);
      else totalReceived += balance;
    });
    totalGivenEl.textContent = `₹${totalGiven}`;
    totalReceivedEl.textContent = `₹${totalReceived}`;
    netBalanceEl.textContent = `₹${totalReceived - totalGiven}`;
  }

  function render() {
    peopleList.innerHTML = "";
    calcBalances();
    people.forEach((p) => {
      const div = document.createElement("div");
      div.className = "person";
      div.innerHTML = `
        <div class="person-info">
          <h4>${p.name}</h4>
          <small>${p.transactions.length} transactions</small>
        </div>
        <div class="balance ${p.balance >= 0 ? "positive" : "negative"}">₹${p.balance}</div>
      `;
      div.onclick = () => {
        localStorage.setItem("currentPersonId", p.id);
        location.href = "person.html";
      };
      peopleList.appendChild(div);
    });
  }

  render();

  // 🔁 Auto-update when localStorage changes (from person page)
  window.addEventListener("storage", (e) => {
    if (e.key === "people") {
      people = JSON.parse(localStorage.getItem("people")) || [];
      render();
    }
  });

  // 🔄 Auto-refresh when returning to the page
  window.addEventListener("pageshow", () => {
    people = JSON.parse(localStorage.getItem("people")) || [];
    render();
  });
}

// ---------- PERSON DETAIL PAGE ----------
if (document.getElementById("txnList")) {
  const personId = Number(localStorage.getItem("currentPersonId"));
  const person = people.find((p) => p.id === personId);
  const txnList = document.getElementById("txnList");
  const addTxnBtn = document.getElementById("addTxnBtn");
  const txnModal = document.getElementById("txnModal");
  const deletePersonBtn = document.getElementById("deletePersonBtn");

  document.getElementById("personName").textContent = person.name;

  const saveData = () => {
    localStorage.setItem("people", JSON.stringify(people));
    renderTransactions();
  };

  const openModal = (modal) => (modal.style.display = "flex");
  const closeModal = (modal) => (modal.style.display = "none");
  document.querySelectorAll(".cancel").forEach((btn) => (btn.onclick = () => closeModal(txnModal)));
  addTxnBtn.onclick = () => openModal(txnModal);
  document.getElementById("backBtn").onclick = () => history.back();

  // 🗑️ Delete entire person
  deletePersonBtn.onclick = () => {
    const confirmDelete = confirm(`Are you sure you want to delete "${person.name}" and all their transactions?`);
    if (confirmDelete) {
      people = people.filter((p) => p.id !== personId);
      localStorage.setItem("people", JSON.stringify(people));
      alert("Person deleted successfully!");
      location.href = "index.html";
    }
  };

  // 💾 Save transaction
  document.getElementById("saveTxn").onclick = () => {
    const type = document.getElementById("txnType").value;
    const amount = parseFloat(document.getElementById("txnAmount").value);
    const note = document.getElementById("txnNote").value;
    const dateTime = document.getElementById("txnDateTime").value || new Date().toISOString();
    if (!amount) return alert("Enter amount");

    person.transactions.push({ id: Date.now(), type, amount, note, dateTime });
    closeModal(txnModal);
    saveData();
  };

  function renderTransactions() {
    txnList.innerHTML = "";
    if (!person.transactions.length) {
      txnList.innerHTML = "<p style='text-align:center;color:#777'>No transactions yet</p>";
      return;
    }

    const grouped = {};
    person.transactions.forEach((t) => {
      const day = new Date(t.dateTime).toDateString();
      if (!grouped[day]) grouped[day] = [];
      grouped[day].push(t);
    });

    Object.keys(grouped)
      .sort((a, b) => new Date(b) - new Date(a))
      .forEach((day) => {
        const label = document.createElement("div");
        label.className = "date-label";
        const today = new Date().toDateString();
        label.textContent =
          day === today
            ? "Today"
            : new Date(day).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });
        txnList.appendChild(label);

        grouped[day].forEach((t) => {
          const div = document.createElement("div");
          div.className = "txn";
          div.innerHTML = `
            <div class="top">
              <div class="amount ${t.type}">
  ${t.type === "given"
    ? '<span class="up">↑</span>'
    : '<span class="down">↓</span>'
  } ₹${t.amount}
</div>

              <div class="time">${new Date(t.dateTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}</div>
            </div>
            ${t.note ? `<div class="note">${t.note}</div>` : ""}
            <button class="delete-btn" data-id="${t.id}">Delete</button>
          `;
          txnList.appendChild(div);
        });
      });

    // 🗑️ Delete transaction logic
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.onclick = () => {
        const txnId = Number(btn.dataset.id);
        if (confirm("Delete this transaction?")) {
          person.transactions = person.transactions.filter((t) => t.id !== txnId);
          saveData();
        }
      };
    });
  }

  renderTransactions();
}
