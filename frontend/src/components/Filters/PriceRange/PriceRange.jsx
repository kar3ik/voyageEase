import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useFilter } from '../../../context/filterContext';


const minDifference=500

function valuetext(value) {
  return `${value}`;
}

export const PriceRange =()=> {

  const {priceRange, filterDispatch } = useFilter()

  const handlePriceChange = (event, newValue, acticeThumb) =>{
    if(!Array.isArray(newValue)){
      return;
    }
    if(acticeThumb === 0){
      filterDispatch({
        type: "MINIMUM_PRICE",
        payload:{
          newValue, priceRange, minDifference
        }
      })
    }else{
      filterDispatch({
        type:"MAXIMUM_PRICE",
        payload:{
          newValue, priceRange, minDifference
        }
      })
    }

  }

  

  return (
    <div className='filter-container'>
        <span className='filter-label'>price range</span>
        <Box>
        <Slider sx={{color:'black'}}
            getAriaLabel={() => 'Minimum difference'}
            value={priceRange}
            valueLabelDisplay="on"
            getAriaValueText={valuetext}
            onChange={handlePriceChange}
            min={100}
            max={9999}
            disableSwap
        />
        </Box>

    </div>
    
  );
}
