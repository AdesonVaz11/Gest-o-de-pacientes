//input group
// import Styles from './InputGroup.module.css'

function InputGroup({ label, placeholder, type, name, handleChange, value }) {
    return (
        <div className=''>
            <label className=''>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                className=''
                name={name}
                // toda vez que for lidar com eventos utilizar handle
                onChange={handleChange}
                value={value}
            />
        </div>
    )
}

export default InputGroup