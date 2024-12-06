

export default function TeamNumberSelector () {

    return (
        <div className="text-xl text-center">
            <label htmlFor="teamQuantity">Teams:</label>
            <select className="bg-gray-500 mr-3" id="teamQuantity">
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
        </div>
    )
}