import React from 'react'
import ResultsHeader from '../../containers/ResultsHeader/ResultsHeader'
import CreateMenuItem from '../CreateModal/CreateRestaurant/CreateMenuItem'

const FullRestaurant = () => {
    //const [show, setShow] = useState(false);


    return (
        <div>
            <ResultsHeader
                name="Restaurant"
                buttonText="+ Menu Item" >
                <CreateMenuItem />
            </ResultsHeader>
        </div>
    )
}

export default FullRestaurant
