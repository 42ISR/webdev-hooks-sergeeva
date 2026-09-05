import Input from "../../components/Input/Input"
import Button from "../../components/Button/Button"
import Task from "../../components/Task/Task"
import Checkbox from "../../components/Checkbox/Checkbox"
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'

const initialData = [
    {
        id: nanoid(),
        title: "Migrate onboarding flow to new design",
        completed: false,
        counter: 3
    },
    {
        id: nanoid(),
        title: "Write API docs for /webhooks",
        completed: true,
        counter: 5
    },
    {
        id: nanoid(),
        title: "Fix flaky retry test in queue worker",
        completed: false,
        counter: 2
    }
]

const PageBoard = () => {
    const [tasks, setTasks] = useState(initialData)
    const [shownTasks, setShownTasks] = useState([])
    const [showCompleted, setShowCompleted] = useState(false)

    const handleAdd = (e) => {
        e.preventDefault()

        const newTitle = e.target.taskTitle.value.trim()

        if (newTitle.length < 3) return

        const newTask = {
            id: nanoid(),
            title: e.target.taskTitle.value,
            completed: false,
            counter: 0
        }

        setTasks(oldTasks => [...oldTasks, newTask])

        e.target.reset()
    }

    useEffect(() => {
        if (showCompleted) {
            setShownTasks(tasks.filter(t => t.completed))
        } else {
            setShownTasks(tasks)
        }
    }, [tasks, showCompleted])

    return (
        <section className="page" id="page-board">
            <div className="page-header">
                <h1 className="page-title">Board</h1>
                <p className="page-subtitle">Sprint 24, growth pod</p>
            </div>

            <div
                className="mount-wrap"
                data-hook="3.1 useState + useEffect (fetch on mount)">
                <div className="mount-point stats-row" id="mount-stats">
                    <div className="stat-card">
                        <div className="stat-value">{tasks.length}</div>
                        <div className="stat-label">Open</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{tasks.filter(t => t.completed).length}</div>
                        <div className="stat-label">In progress</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{}</div>
                        <div className="stat-label">Done this sprint</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">7.4</div>
                        <div className="stat-label">Velocity</div>
                    </div>
                </div>
            </div>

            <div className="board-toolbar">
                <div className="mount-wrap" data-hook="1.2 useState (toggle)">
                    <div
                        className="mount-point switch-row"
                        id="mount-show-completed">
                        <Checkbox 
                            checked={showCompleted}
                            onChange={() => setShowCompleted(v => !v)}
                        />
                        <span>Show completed tasks</span>
                    </div>
                </div>
            </div>

            <div
                className="mount-wrap"
                data-hook="1.6 array · 1.1 counter · 1.5 functional update">
                <div className="mount-point" id="mount-tasklist">
                    <form onSubmit={handleAdd} className="add-task-row">
                        <Input
                            className="grow"
                            name="taskTitle"
                            placeholder="Add a task and press Enter..."
                        />
                        <Button>Add</Button>
                    </form>
                    <div className="task-list">
                        {shownTasks.map((task, i) => <Task setTasks={setTasks} key={i} {...task}/>)}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PageBoard
