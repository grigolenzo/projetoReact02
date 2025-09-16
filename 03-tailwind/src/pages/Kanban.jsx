// Página de Quadro Kanban com Tailwind CSS, acessibilidade e persistência
import React, { useEffect, useMemo, useRef, useState } from 'react';
// Remove a importação do CSS Module
// import styles from './Kanban.module.css';

// Colunas disponíveis do quadro
const COLUMNS = [
  { id: 'todo', name: 'Backlog' },
  { id: 'doing', name: 'Em Progresso' },
  { id: 'done', name: 'Concluído' },
];

// Tarefas iniciais (exemplo)
const DEFAULT_TASKS = [
  { id: 't1', title: 'Definir escopo do sprint', column: 'todo', tag: 'Planejamento' },
  { id: 't2', title: 'Levantar requisitos com o time', column: 'todo', tag: 'Descoberta' },
  { id: 't3', title: 'Criar wireframes de alta fidelidade', column: 'doing', tag: 'Design' },
  { id: 't4', title: 'Implementar autenticação OAuth2', column: 'doing', tag: 'Backend' },
  { id: 't5', title: 'Escrever testes de integração', column: 'done', tag: 'QA' },
  { id: 't6', title: 'Publicar release 1.0', column: 'done', tag: 'Release' },
];

const STORAGE_KEY = 'kanban_tasks_v1';

// Componente principal do Kanban
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

  const btnClasses = "flex items-center justify-center p-2 rounded-lg text-lg font-semibold transition-all duration-200";

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
        Quadro Kanban
      </h1>

      <form
        className="flex flex-col md:flex-row gap-4 justify-center"
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
          className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
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
          className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          type="search"
          placeholder="Filtrar por título"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          aria-label="Filtrar tarefas por título"
        />
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="Colunas do kanban">
        {COLUMNS.map((col) => (
          <section
            key={col.id}
            className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 shadow-sm dark:shadow-md transition-colors duration-200"
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, col.id)}
            aria-labelledby={`h-${col.id}`}
            role="group"
            tabIndex={0}
          >
            <header className="flex items-center justify-between pb-2 mb-2 border-b-2 border-dashed border-gray-300 dark:border-gray-600">
              <h2 id={`h-${col.id}`} className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {col.name}
              </h2>
              <span className="text-sm font-bold bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full" aria-label={`Total de tarefas: ${filtered.filter(t => t.column === col.id).length}`}>
                {filtered.filter(t => t.column === col.id).length}
              </span>
            </header>

            <ul className="list-none pt-2 m-0 p-0 flex flex-col gap-3" role="list" aria-describedby={`d-${col.id}`}>
              <span id={`d-${col.id}`} className="sr-only">
                Arraste e solte tarefas ou use os botões para mover.
              </span>

              {filtered
                .filter(t => t.column === col.id)
                .map((t) => (
                  <li key={t.id} className="cursor-grab" role="listitem">
                    <article
                      className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                      draggable
                      onDragStart={(e) => onDragStart(e, t.id)}
                      onDragEnd={onDragEnd}
                      aria-grabbed="false"
                    >
                      <div className="inline-block text-xs font-semibold px-2 py-1 rounded-full text-white bg-blue-500 dark:bg-blue-400 mb-2">
                        {t.tag}
                      </div>

                      <h3 className="text-base font-medium text-gray-900 dark:text-gray-100 mb-2">
                        {t.title}
                      </h3>

                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          className={`${btnClasses} text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600`}
                          onClick={() => moveTask(t.id, -1)}
                          aria-label="Mover para a coluna anterior"
                          title="Mover para a coluna anterior"
                        >
                          ←
                        </button>
                        <button
                          type="button"
                          className={`${btnClasses} bg-blue-500 hover:bg-blue-600 text-white`}
                          onClick={() => moveTask(t.id, +1)}
                          aria-label="Mover para a próxima coluna"
                          title="Mover para a próxima coluna"
                        >
                          →
                        </button>
                        <button
                          type="button"
                          className={`${btnClasses} border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600`}
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