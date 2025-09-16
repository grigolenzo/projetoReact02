import React, { useEffect, useMemo, useRef, useState } from 'react';

const COLUMNS = [
  { id: 'todo', name: 'Backlog' },
  { id: 'doing', name: 'Em Progresso' },
  { id: 'done', name: 'Concluído' },
];

const DEFAULT_TASKS = [
  { id: 't1', title: 'Definir escopo do sprint', column: 'todo', tag: 'Planejamento' },
  { id: 't2', title: 'Levantar requisitos com o time', column: 'todo', tag: 'Descoberta' },
  { id: 't3', title: 'Criar wireframes de alta fidelidade', column: 'doing', tag: 'Design' },
  { id: 't4', title: 'Implementar autenticação OAuth2', column: 'doing', tag: 'Backend' },
  { id: 't5', title: 'Escrever testes de integração', column: 'done', tag: 'QA' },
  { id: 't6', title: 'Publicar release 1.0', column: 'done', tag: 'Release' },
];

const STORAGE_KEY = 'kanban_tasks_v1';

export default function Kanban() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_TASKS;
  });
  const [filter, setFilter] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const filtered = useMemo(() => {
    const term = filter.trim().toLowerCase();
    if (!term) return tasks;
    return tasks.filter(t => t.title.toLowerCase().includes(term));
  }, [tasks, filter]);

  const addTask = (title) => {
    const trimmed = title.trim();
    if (!trimmed) return;
    const newTask = {
      id: 't' + Math.random().toString(36).slice(2, 8),
      title: trimmed,
      column: 'todo',
      tag: 'Nova',
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const moveTask = (taskId, dir) => {
    setTasks(prev => {
      const map = Object.fromEntries(COLUMNS.map((c, i) => [c.id, i]));
      return prev.map(t => {
        if (t.id !== taskId) return t;
        const i = map[t.column];
        const nextIndex = Math.min(Math.max(i + dir, 0), COLUMNS.length - 1);
        return { ...t, column: COLUMNS[nextIndex].id };
      });
    });
  };

  const removeTask = (taskId) => {
    setTasks(prev => prev.filter(t => t.id != taskId));
  };

  const onDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
    e.currentTarget.setAttribute('aria-grabbed', 'true');
  };

  const onDragEnd = (e) => {
    e.currentTarget.setAttribute('aria-grabbed', 'false');
  };

  const onDrop = (e, columnId) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, column: columnId } : t)));
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };
  
  const focusRing = "focus:outline-none focus:ring-2 focus:ring-accent rounded-lg"

  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      <h1 className="text-2xl md:text-3xl font-bold text-fg-strong mb-4">
        Quadro Kanban
      </h1>
      
      <form
        className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-5xl"
        onSubmit={(e) => {
          e.preventDefault();
          addTask(inputRef.current.value);
          inputRef.current.value = '';
          inputRef.current.focus();
        }}
        aria-label="Adicionar e filtrar tarefas"
      >
        <label className="sr-only" htmlFor="newTask">
          Nova tarefa
        </label>
        <input
          id="newTask"
          ref={inputRef}
          className={`flex-1 py-2 px-4 rounded-lg border-2 border-border-strong bg-surface ${focusRing}`}
          type="text"
          placeholder="Descreva a tarefa e pressione Enter"
          required
          aria-required="true"
        />

        <label className="sr-only" htmlFor="filter">
          Filtrar tarefas
        </label>
        <input
          id="filter"
          className={`flex-1 py-2 px-4 rounded-lg border-2 border-border-strong bg-surface ${focusRing}`}
          type="search"
          placeholder="Filtrar por título"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label="Filtrar tarefas por título"
        />
      </form>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl" role="list" aria-label="Colunas do kanban">
        {COLUMNS.map((col) => (
          <section
            key={col.id}
            className="flex-1 flex flex-col bg-surface-2 rounded-lg p-4 transition-shadow duration-200 hover:shadow-md focus-within:shadow-md"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, col.id)}
            aria-labelledby={`h-${col.id}`}
            role="group"
            tabIndex={0}
          >
            <header className="flex justify-between items-center mb-4">
              <h2 id={`h-${col.id}`} className="text-lg font-bold text-fg-strong">
                {col.name}
              </h2>
              <span className="text-sm font-semibold text-fg-strong bg-surface-3 py-1 px-2 rounded-full" aria-label={`Total de tarefas: ${filtered.filter(t => t.column === col.id).length}`}>
                {filtered.filter(t => t.column === col.id).length}
              </span>
            </header>

            <ul className="flex-1 space-y-4" role="list" aria-describedby={`d-${col.id}`}>
              <span id={`d-${col.id}`} className="sr-only">
                Arraste e solte tarefas ou use os botões para mover.
              </span>

              {filtered
                .filter(t => t.column === col.id)
                .map((t) => (
                  <li key={t.id} className="cursor-grab rounded-lg focus-within:ring-2 focus-within:ring-accent" role="listitem">
                    <article
                      className="relative bg-surface p-4 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
                      draggable
                      onDragStart={(e) => onDragStart(e, t.id)}
                      onDragEnd={onDragEnd}
                      tabIndex={0}
                      aria-grabbed="false"
                      role="button"
                    >
                      <div className="absolute top-2 right-2 z-10">
                        <div className="bg-accent text-white text-xs font-semibold py-1 px-2 rounded-full">
                          {t.tag}
                        </div>
                      </div>

                      <h3 className="text-base font-semibold text-fg-strong pr-10">
                        {t.title}
                      </h3>

                      <div className="flex mt-4 gap-2 justify-end">
                        <button
                          type="button"
                          className={`p-2 rounded-lg text-sm font-semibold transition-colors duration-200 bg-transparent text-fg-strong hover:bg-surface-2 ${focusRing}`}
                          onClick={() => moveTask(t.id, -1)}
                          aria-label="Mover para a coluna anterior"
                          title="Mover para a coluna anterior"
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          className={`p-2 rounded-lg text-sm font-semibold transition-colors duration-200 bg-accent text-white hover:bg-opacity-90 ${focusRing}`}
                          onClick={() => moveTask(t.id, +1)}
                          aria-label="Mover para a próxima coluna"
                          title="Mover para a próxima coluna"
                        >
                          →
                        </button>
                        <button
                          type="button"
                          className={`p-2 rounded-lg text-sm font-semibold transition-colors duration-200 bg-transparent text-accent border-2 border-accent hover:bg-accent hover:text-white ${focusRing}`}
                          onClick={() => removeTask(t.id)}
                          aria-label="Excluir tarefa"
                          title="Excluir tarefa"
                        >
                          Excluir
                        </button>
                      </div>
                    </article>
                  </li>
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}