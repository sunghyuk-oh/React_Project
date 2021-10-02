import { connect } from 'react-redux'
import PieChart from './PieChart'
import { useEffect, useState } from 'react'

function TaskDetails(props) {
    const [task_times, setTask_times] = useState([])

    useEffect(() => {
        setTask_times(props.taskDetails)
    }, [])
    
    console.log(props.taskDetails, task_times)

    const formatTime = (duration) => {
        const seconds = `${(duration % 60)}`.slice(-2)
        const initMinutes = `${Math.floor(duration / 60)}`
        const minutes = `${initMinutes % 60}`.slice(-2)
        const hours = `${Math.floor(duration / 3600)}`.slice(-2)
    
        if (hours === '0' & minutes === '0') {
          return `${seconds} sec`
        } else if (hours === '0' && minutes !== '0') {
          return `${minutes} min ${seconds} sec`
        } else {
          return `${hours} hr ${minutes} min ${seconds} sec`
        }
    }
    
    const details = props.taskDetails.map((task, index) => {
        return (
            <div key={index} className="detailsDescription">
                <h4>{task.task_title}</h4>
                <p>{formatTime(task.task_duration)}</p>
            </div>
        )
    })

    return (
        <div>
            {details}
            <div className="pieChart">
                <PieChart allTask={task_times} />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        taskDetails: state.detailedTasks
    }
}

export default connect(mapStateToProps)(TaskDetails)