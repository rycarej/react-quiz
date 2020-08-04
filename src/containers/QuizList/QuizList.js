import React, { Component } from 'react'
import classes from './QuizList.module.css'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

export default class QuizList extends Component {

    state = {
        quizes: []
    }

    renderQuizes() {
        return this.state.quizes.map(quiz => {
            return (
                <li
                key={quiz.id}
                >
                    <NavLink to={`/quiz/${quiz.id}`}>
                        {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get('https://react-quiz-bc22d.firebaseio.com/quizes.json')

            const quizes = []

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Quiz №${index + 1}`
                })

                this.setState({
                    quizes
                })
            })
        } catch(e) {
            console.log(e)
        }
        
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Quiz List</h1>

                    <ul>
                        {this.renderQuizes()}
                    </ul>
                </div>
            </div>
        )
    }
}