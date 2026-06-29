export function initMobileMenu() {
	const toggle = document.querySelector('.menu-toggle')
	const mobileMenu = document.querySelector('.mobile-menu')
	const overlay = document.querySelector('.mobile-menu-overlay')
	const closeBtn = document.querySelector('.mobile-menu-close')
	const links = document.querySelectorAll('.mobile-menu a')

	if (!toggle || !mobileMenu) return

	function openMenu() {
		mobileMenu.classList.add('open')
		overlay.classList.add('open')
		document.documentElement.classList.add('no-scroll')
		toggle.classList.add('active')
	}

	function closeMenu() {
		mobileMenu.classList.remove('open')
		overlay.classList.remove('open')
		document.documentElement.classList.remove('no-scroll')
		toggle.classList.remove('active')
	}

	toggle.addEventListener('click', () => {
		const isOpen = mobileMenu.classList.contains('open')
		isOpen ? closeMenu() : openMenu()
	})

	overlay.addEventListener('click', closeMenu)
	closeBtn.addEventListener('click', closeMenu)

	links.forEach((link) => {
		link.addEventListener('click', closeMenu)
	})

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
			closeMenu()
		}
	})
}