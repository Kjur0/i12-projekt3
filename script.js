var articleContainer
const articleData = []

$(() => {
	$("article").each((i, el) => {
		articleData.push(el.id)
	})

	matchMedia("(max-width: 600px)").onchange = mediaUpdate
	matchMedia("(min-width: 600px) and (max-width: 1200px)").addEventListener = mediaUpdate
	matchMedia("(min - width: 1200px)").onchange = mediaUpdate

	mediaUpdate()
})

function scrollUpdate() {
	switch (media()) {
		case 'desktop':
			if (articleContainer.scrollLeft() > 0)
				$("#articleContainerScrollFadeLeft").fadeIn(200)
			else
				$("#articleContainerScrollFadeLeft").fadeOut(200)

			if ((articleContainer.scrollLeft() + Math.ceil(articleContainer.innerWidth())) < articleContainer[0].scrollWidth)
				$("#articleContainerScrollFadeRight").fadeIn(200)
			else
				$("#articleContainerScrollFadeRight").fadeOut(200)

			break;

		case 'mobile':
			if (articleContainer.scrollLeft() > 0)
				$("#articleContainerScrollFadeLeft").fadeIn(200)
			else
				$("#articleContainerScrollFadeLeft").fadeOut(200)

			if ((articleContainer.scrollLeft() + Math.ceil(articleContainer.innerWidth())) < articleContainer[0].scrollWidth)
				$("#articleContainerScrollFadeRight").fadeIn(200)
			else
				$("#articleContainerScrollFadeRight").fadeOut(200)

			break;
		default:
			break;
	}
}

function elementMain(el) {
	location.href = `#${el}`
	switch (media()) {
		case 'desktop':
			if (articleData.includes(el))
				articleContainer.animate({ scrollLeft: ((articleData.indexOf(el) - 0.5) * $(`#${el}`).outerWidth(true)) }, 500)
			scrollUpdate()

			break;
		case 'tablet':
			$(document).scrollTop(($(document).scrollTop() - vh(25)))

			break;
		case 'mobile':
			if (articleData.includes(el))
				articleContainer.animate({ scrollLeft: (articleData.indexOf(el) * $(`#${el}`).outerWidth(true)) }, 500)
			scrollUpdate()
			$(document).scrollTop(($(document).scrollTop() - (vh(30) + 10)))

			break;
		default:
			break;
	}
}

function mediaUpdate() {
	try {
		articleContainer.off('scroll')
		$("#articleContainerScrollFadeLeft").off('click')
		$("#articleContainerScrollFadeRight").off('click')
	} catch (e) { }
	articleContainer = $(".articleContainer")
	$("#articleContainerScrollFadeLeft").show()
	$("#articleContainerScrollFadeRight").show()
	switch (media()) {
		case 'desktop':
			scrollUpdate()
			articleContainer.scroll(scrollUpdate)

			$("#articleContainerScrollFadeLeft").click(() => {
				articleContainer.animate({ scrollLeft: 0 }, 500)
			})
			$("#articleContainerScrollFadeRight").click(() => {
				articleContainer.animate({ scrollLeft: (articleContainer[0].scrollWidth - Math.floor(articleContainer.innerWidth()) + 1) }, 500)
			})

			break;
		case 'tablet':
			$("#articleContainerScrollFadeLeft").hide()
			$("#articleContainerScrollFadeRight").hide()

			break;
		case 'mobile':
			scrollUpdate()
			articleContainer.scroll(scrollUpdate)

			break;
		default:
			break;
	}
}

const vw = (n) => n * (Math.max(document.documentElement.clientWidth, innerWidth) / 100)

const vh = (n) => n * (Math.max(document.documentElement.clientHeight, innerHeight) / 100)

const media = () => matchMedia("(max-width: 600px)").matches ? 'mobile' : matchMedia("(min-width: 600px) and (max-width: 1200px)").matches ? 'tablet' : matchMedia("(min - width: 1200px)") ? 'desktop' : null