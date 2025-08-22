(function () {
  const STORAGE_KEY = 'budget_tx';
  const form = document.getElementById('transactionForm');
  const typeEl = document.getElementById('type');
  const amountEl = document.getElementById('amount');
  const categoryEl = document.getElementById('category');
  const dateEl = document.getElementById('date');
  const noteEl = document.getElementById('note');
  const totalIncomeEl = document.getElementById('totalIncome');
  const totalExpensesEl = document.getElementById('totalExpenses');
  const balanceEl = document.getElementById('balance');
  const txTableBody = document.querySelector('#txTable tbody');
  const categoriesDatalist = document.getElementById('categoriesList');

  // Budget elements
  const needsPctEl = document.getElementById('needsPct');
  const wantsPctEl = document.getElementById('wantsPct');
  const savingsPctEl = document.getElementById('savingsPct');
  const needsProg = document.getElementById('needsProg');
  const wantsProg = document.getElementById('wantsProg');
  const savingsProg = document.getElementById('savingsProg');
  const needsDisplay = document.getElementById('needsDisplay');
  const wantsDisplay = document.getElementById('wantsDisplay');
  const savingsDisplay = document.getElementById('savingsDisplay');
  const applyBudgetBtn = document.getElementById('applyBudget');

  dateEl.value = new Date().toISOString().slice(0, 10);

  function loadTx() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Failed to load transactions', e);
      return [];
    }
  }

  function saveTx(tx) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tx));
  }

  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

  function updateBudgetBars(totalIncome, totalExpenses) {
    const needsPct = parseFloat(needsPctEl.value) || 0;
    const wantsPct = parseFloat(wantsPctEl.value) || 0;
    const savingsPct = parseFloat(savingsPctEl.value) || 0;

    const budgetAmounts = {
      needs: (totalIncome * needsPct) / 100,
      wants: (totalIncome * wantsPct) / 100,
      savings: (totalIncome * savingsPct) / 100
    };

    // Already spent in each category
    const tx = loadTx();
    const spent = {
      needs: tx.filter(t => t.type === 'expense' && t.category.toLowerCase() === 'needs')
        .reduce((sum, t) => sum + Number(t.amount), 0),
      wants: tx.filter(t => t.type === 'expense' && t.category.toLowerCase() === 'wants')
        .reduce((sum, t) => sum + Number(t.amount), 0),
      savings: tx.filter(t => t.type === 'expense' && t.category.toLowerCase() === 'savings')
        .reduce((sum, t) => sum + Number(t.amount), 0),
    };

    // Update bars & text
    needsProg.value = Math.min((spent.needs / budgetAmounts.needs) * 100, 100);
    wantsProg.value = Math.min((spent.wants / budgetAmounts.wants) * 100, 100);
    savingsProg.value = Math.min((spent.savings / budgetAmounts.savings) * 100, 100);

    needsDisplay.textContent = `${needsPct}% → ${budgetAmounts.needs.toFixed(2)} (Spent: ${spent.needs.toFixed(2)})`;
    wantsDisplay.textContent = `${wantsPct}% → ${budgetAmounts.wants.toFixed(2)} (Spent: ${spent.wants.toFixed(2)})`;
    savingsDisplay.textContent = `${savingsPct}% → ${budgetAmounts.savings.toFixed(2)} (Spent: ${spent.savings.toFixed(2)})`;
  }

  function render() {
    const all = loadTx();
    let income = 0, expenses = 0;
    all.forEach(t => {
      if (t.type === 'income') income += Number(t.amount);
      else expenses += Number(t.amount);
    });
    totalIncomeEl.textContent = income.toFixed(2);
    totalExpensesEl.textContent = expenses.toFixed(2);
    balanceEl.textContent = (income - expenses).toFixed(2);

    txTableBody.innerHTML = '';
    all.slice().reverse().forEach(t => {
      const tr = document.createElement('tr');
      tr.innerHTML = '<td>' + t.date + '</td>' +
        '<td>' + t.type + '</td>' +
        '<td>' + (t.category || '') + '</td>' +
        '<td>' + Number(t.amount).toFixed(2) + '</td>' +
        '<td>' + (t.note || '') + '</td>' +
        '<td></td>';
      const actionsTd = tr.querySelector('td:last-child');
      const editBtn = document.createElement('button'); editBtn.textContent = 'Edit';
      editBtn.addEventListener('click', () => startEdit(t.id));
      const delBtn = document.createElement('button'); delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', () => removeTx(t.id));
      actionsTd.appendChild(editBtn);
      actionsTd.appendChild(document.createTextNode(' '));
      actionsTd.appendChild(delBtn);
      txTableBody.appendChild(tr);
    });

    const allCats = Array.from(new Set(all.map(t => t.category).filter(Boolean))).sort();
    categoriesDatalist.innerHTML = '';
    allCats.forEach(c => { const opt = document.createElement('option'); opt.value = c; categoriesDatalist.appendChild(opt); });

    updateBudgetBars(income, expenses);
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const tx = loadTx();
    const entry = {
      id: uid(),
      type: typeEl.value,
      amount: Number(amountEl.value) || 0,
      category: categoryEl.value.trim(),
      date: dateEl.value,
      note: noteEl.value.trim()
    };
    tx.push(entry);
    saveTx(tx);
    form.reset();
    dateEl.value = new Date().toISOString().slice(0, 10);
    render();
  });

  function startEdit(id) {
    const tx = loadTx();
    const item = tx.find(t => t.id === id);
    if (!item) return;
    typeEl.value = item.type;
    amountEl.value = item.amount;
    categoryEl.value = item.category;
    dateEl.value = item.date;
    noteEl.value = item.note;
    const remaining = tx.filter(t => t.id !== id);
    saveTx(remaining);
    render();
  }

  function removeTx(id) {
    if (!confirm('Delete this transaction?')) return;
    const tx = loadTx().filter(t => t.id !== id);
    saveTx(tx);
    render();
  }

  applyBudgetBtn.addEventListener('click', () => {
    const all = loadTx();
    let income = 0, expenses = 0;
    all.forEach(t => {
      if (t.type === 'income') income += Number(t.amount);
      else expenses += Number(t.amount);
    });
    updateBudgetBars(income, expenses);
  });

  render();
})();