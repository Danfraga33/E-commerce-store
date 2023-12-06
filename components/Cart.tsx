import React, { useRef } from 'react';
import Link from 'next/link';
import {
	AiOutlineMinus,
	AiOutlinePlus,
	AiOutlineLeft,
	AiOutlineShopping,
} from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import toast from 'react-hot-toast';
import { useStateContext } from '@/context/StateContext';
import { urlFor } from '@/lib/client';

const Cart = () => {
	const cartRef = useRef();
	const { totalPrice, totalQuantities, cartItems, setShowCart } =
		useStateContext();
	return (
		<div className="c	art-wrapper" ref={cartRef}>
			<div className="cart-container">
				<button
					className="cart-heading"
					type="button"
					onClick={() => setShowCart(false)}
				>
					{AiOutlineLeft}
					<span className="heading">Your Cart</span>
					<span className="cart-num-items">({totalQuantities} items)</span>
				</button>

				{cartItems > 1 && (
					<div className="empty-cart">
						<AiOutlineShopping size={150} />
						<h3>Your Shopping bad is empty</h3>
						<Link href="/">
							<button
								type="button"
								onClick={() => setShowCart(false)}
								className="btn"
							>
								Continue Shopping
							</button>
						</Link>
					</div>
				)}

				<div className="product-container">
					{cartItems.length >= 1 &&
						cartItems.map(
							(
								item: any, //Change
								index: any //Change
							) => (
								<div className="product" key={item._id}>
									<img
										src={urlFor(item?.image[0].url())}
										className="cart-product-image"
									>
										<div className="item-desc">
											<div className="flex top">
												<h5>{item.name}</h5>
												<h4>${item.price}</h4>
											</div>
											<div className="flex bottom">
												<div>
													<p className="quantity-desc">
														<div className="quantity">
															<span className="minus">
																<AiOutlineMinus />
															</span>
															<span className="num">0</span>
															<span className="plus">
																<AiOutlinePlus />
															</span>
														</div>
													</p>
												</div>
												<button type="button" className="remove-item">
													<TiDeleteOutline />
												</button>
											</div>
										</div>
									</img>
								</div>
							)
						)}
				</div>
			</div>
		</div>
	);
};

export default Cart;
