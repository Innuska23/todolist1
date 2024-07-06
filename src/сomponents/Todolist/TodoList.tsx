import { ChangeEvent } from "react"

import { FilterValuesType } from "../../App"
import { AddItemForm } from "../AddItemForm/AddItemForm"
import { EditableSpan } from "../EditableSpan/EditableSpan"

import { Button, Checkbox, IconButton, Box } from "@mui/material"
import { Delete } from "@mui/icons-material"

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListId: string) => void
    changeTodoListTitle: (todoListId: string, newTitle: string) => void
}

export function TodoList(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }

    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(newTitle, props.id)
    }

    return (
        <Box p={2}>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle} />
                <IconButton onClick={removeTodoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <Box mt={2} mb={2}>
                {
                    props.tasks.length === 0 ? (
                        <Box p={2} textAlign="center" color="text.secondary">No tasks</Box>
                    ) : (
                        props.tasks.map(t => {

                            const onRemoveHandler = () => {
                                props.removeTask(t.id, props.id)
                            }

                            const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                            }
                            const onChangeTitleHandler = (newValue: string) => {
                                props.changeTaskTitle(t.id, newValue, props.id);
                            }

                            return <Box key={t.id} display="flex" alignItems="center" justifyContent="space-between" className={t.isDone ? "is-done" : ''}>
                                <Checkbox
                                    checked={t.isDone}
                                    onChange={onChangeStatusHandler}
                                />
                                <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
                                <IconButton onClick={onRemoveHandler}>
                                    <Delete />
                                </IconButton>
                            </Box>
                        })
                    )
                }
            </Box>
            <Box display="flex" justifyContent="space-between">
                <Button
                    color={"success"}
                    variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}
                >
                    All
                </Button>
                <Button
                    color={"primary"}
                    variant={props.filter === 'active' ? "contained" : "text"}
                    onClick={onActiveClickHandler}
                >
                    Active
                </Button>
                <Button
                    color={"secondary"}
                    variant={props.filter === 'completed' ? "contained" : "text"}
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </Button>
            </Box>
        </Box>
    )
}
