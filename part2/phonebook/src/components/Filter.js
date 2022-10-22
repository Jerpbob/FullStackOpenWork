const Filter = ({ filter, handleFilterChange }) => {
    return (
        <form>
            <div>filter with: <input
                value={filter}
                onChange={handleFilterChange}
            />
            </div>
        </form>
    )
}

export default Filter