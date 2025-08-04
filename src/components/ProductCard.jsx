import { Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function ProductCard (product) {
  return (
    <div className="product-card">
      {product.discount > 0 ? 
            (<div className="discount-badge">-{product.discount}%</div>)
            :
            null
            }
      <div className="img">
        <img
          src={product.image}
          alt="Picture not found"
        />
      </div>
      <div className="info">
        <div className="cat">{product.category}</div>
        <h2 className="title">{product.name}</h2>
        {product.stock > 0 ? 
            (<div className="stock">In Stock</div>)
            :
            (<div className="out-of-stock">Out Of Stock</div>)
            }
        <div className="bottom">
          <div className="price">
            {product.discount > 0 ? 
            (<>
                <span className="new">{(product.price - (product.price * product.discount / 100)).toFixed(0)} Ft</span>
                <span className="old">{product.price} Ft</span>
            </>)
            :
            (
                <span className="new">{product.price} Ft</span>
            )
            }
          </div>
          <Link to={`/product?product=${product.id}`} className="btn">
              <span>View Product</span>
              <Visibility />
          </Link>
        </div>
      </div>
    </div>
  );
};
