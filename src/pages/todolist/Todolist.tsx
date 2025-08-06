import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { getTodos, addTodo, deleteTodo, updateTodo } from '@/services/todoService';
import type { TodoItem } from '@/services/todoService';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';

const priorities = [
  'urgent_important',
  'urgent_not_important',
  'not_urgent_important',
  'not_urgent_not_important'
];

const priorityLabels: Record<string, string> = {
  urgent_important: '📌 Quan trọng & Ưu tiên',
  urgent_not_important: '⚡ Ưu tiên nhưng không quan trọng',
  not_urgent_important: '📖 Quan trọng nhưng không ưu tiên',
  not_urgent_not_important: '🧘 Không quan trọng & Không ưu tiên'
};

function TodoList() {
  const { user, loading, isAuthenticated } = useAuth();
  const [todos, setTodos] = useState<Record<string, TodoItem[]>>({});
  const [text, setText] = useState('');
  const [priority, setPriority] = useState(priorities[0]);
  const [deadline, setDeadline] = useState('');

  const loadTodos = async () => {
    if (!user) return;
    const list = await getTodos(user.uid);
    const grouped: Record<string, TodoItem[]> = {};
    priorities.forEach(p => grouped[p] = []);
    list.forEach((todo: any) => grouped[todo.priority]?.push(todo));
    setTodos(grouped);
  };

  useEffect(() => {
    loadTodos();
  }, [user]);

  const handleAdd = async () => {
    if (!text.trim() || !user) return;
    const todo: any = {
      text,
      uid: user.uid,
      priority,
      deadline
    };
    await addTodo(todo);
    setText('');
    setDeadline('');
    await loadTodos();
  };

  const handleDelete = async (id: string) => {
    await deleteTodo(id);
    await loadTodos();
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || !user) return;

    const sourceList = [...todos[source.droppableId]];
    const [movedItem]: any = sourceList.splice(source.index, 1);
    movedItem.priority = destination.droppableId;

    const destList = [...todos[destination.droppableId]];
    destList.splice(destination.index, 0, movedItem);

    const updatedTodos = {
      ...todos,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList
    };

    setTodos(updatedTodos);
    await updateTodo(movedItem); // Dùng updateTodo(todo: TodoItem)
  };

  if (loading) return <p className="text-center mt-4">Đang kiểm tra đăng nhập...</p>;
  if (!isAuthenticated) return <p className="text-center mt-4">Vui lòng đăng nhập để dùng TodoList</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Todo Trello Style</h2>
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Nhập công việc..." className="border p-2 rounded w-full md:w-auto" />
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border p-2 rounded">
          {priorities.map(p => <option key={p} value={p}>{priorityLabels[p]}</option>)}
        </select>
        <input type="datetime-local" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="border p-2 rounded" />
        <button onClick={handleAdd} className="bg-blue-500 px-4 py-2 rounded">Thêm</button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {priorities.map((p) => (
            <Droppable droppableId={p} key={p}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className=" p-3 rounded shadow min-h-[300px]">
                  <h3 className="font-semibold mb-2">{priorityLabels[p]}</h3>
                  {todos[p]?.map((todo: any, index) => (
                    <Draggable key={todo.id} draggableId={todo.id!} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className=" p-2 rounded shadow mb-2 flex justify-between items-center"
                        >
                          <div>
                            <p>{todo.text}</p>
                            {todo.deadline && <small className="text-gray-500">📅 {new Date(todo.deadline).toLocaleString()}</small>}
                          </div>
                          <button onClick={() => handleDelete(todo.id!)} className="text-red-500">X</button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default TodoList;
