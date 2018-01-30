import React, { Component } from 'react';
import { List } from 'immutable';

import Circle from './Circle';

import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            playing: false,
            timeLeft: 0,
            circles: new List(),
            playgroundSize: [],
            points: 0,
        };
        this.maxCircleSize = 50;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.playing === false && this.state.playing === true) {
            this.setState({
                timeLeft: 30,
                playgroundSize: [
                    this.refPlayground.offsetWidth,
                    this.refPlayground.offsetHeight,
                ],
            });
            this.intervalCircles = setInterval(() => {
                const position = this.getRandomPosition();
                this.setState({
                    circles: this.state.circles.push(
                        new Circle(position.x, position.y),
                    ),
                })
            }, 1000);
            this.intervalTime = setInterval(() => {
                const newTime = this.state.timeLeft - 1;
                this.setState({
                    playing: newTime === 0 ? false : true,
                    timeLeft: newTime,
                });
            }, 1000);
        }
        if (prevState.playing === true && this.state.playing === false) {
            clearInterval(this.intervalCircles);
            clearInterval(this.intervalTime);
            this.setState({
                circles: new List(),
            })
        }
    }

    getRandom(min, max) {
        return Math.random() * (max - min + 1) + min;
    }

    getRandomPosition() {
        return {
            x: this.getRandom(this.maxCircleSize, this.state.playgroundSize[0] - this.maxCircleSize),
            y: this.getRandom(this.maxCircleSize, this.state.playgroundSize[1] - this.maxCircleSize),
        }
    }

    playSound(name) {
        new Audio(`./sounds/${name}.ogg`).play();
    }

    render() {
        return (
            <div className="game">
                <div className="playground-wrapper">
                    <div
                        className="playground"
                        ref={(node) => {
                            this.refPlayground = node;
                        }}
                        onClick={() => {
                            if (this.state.playing === true) {
                                this.playSound('break');
                            }
                        }}
                    >
                        {this.state.circles.map((circle, i) => {
                            return (
                                <div
                                    key={i}
                                    style={{
                                        top: `${circle.position.y}px`,
                                        left: `${circle.position.x}px`,
                                        background: 'blue',
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        this.playSound('spawn');
                                        this.setState({
                                            circles: this.state.circles.delete(i),
                                            points: this.state.points + 1,
                                        })
                                    }}
                                />
                            )
                        })}
                    </div>
                </div>
                <div className="information">
                    <h2>
                        Play the game
                    </h2>
                    <ul>
                        <li>
                            Time left: {this.state.timeLeft}s
                        </li>
                        <li>
                            Points: {this.state.points}
                        </li>
                    </ul>
                    <button
                        onClick={(e) => {
                            this.setState({
                                playing: !this.state.playing,
                            });
                        }}
                    >
                        {this.state.playing ? 'Stop game' : 'Start game'}
                    </button>
                </div>
            </div>
        );
    }
}

export default App;
