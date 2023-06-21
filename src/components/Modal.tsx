import React from 'react'

interface IModalProps {
	title: string
	children: React.ReactNode
	modalRef?: React.RefObject<HTMLDivElement>
	setModal: (val: boolean) => void
}

const Modal: React.FC<IModalProps> = ({
	title,
	children,
	modalRef,
	setModal
}) => {
	return (
		<div className='modal'>
			<div ref={modalRef} className='modal__container'>
				<div className='modal__title'>
					<h2>{title}</h2>
				</div>
				<div className='modal__content'>{children}</div>
				<div onClick={() => setModal(false)} className='modal-close'>
					<svg
						width='21'
						height='20'
						viewBox='0 0 21 20'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M1.83883 1.16117L19.5165 18.8388M1.83883 18.8388L19.5165 1.16117'
							stroke='#23CFC9'
							stroke-width='2'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
					</svg>
				</div>
			</div>
		</div>
	)
}

export default Modal
