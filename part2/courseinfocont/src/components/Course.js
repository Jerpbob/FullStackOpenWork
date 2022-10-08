import React from 'react'

const Header = (props) => {
    return <h1>{props.course}</h1>;
};

const Part = (props) => {
    return <p>{props.part} {props.exercise}</p>;
};

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(x =>
                <Part key={x.id} part={x.name} exercise={x.exercises} />)}
        </>
    );
};

const Total = ({ course }) => {
    return (
        <>
            <p>
                <strong>
                    total of {course.reduce((total, x) => {
                        return total + x.exercises
                    }, 0)} exercises
                </strong>
            </p>
        </>
    );
};

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total course={course.parts} />
        </div>
    )
}

export default Course