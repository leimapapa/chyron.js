const chyron = (function () {
	let css = `
		@keyframes ticker {
			0% {
				transform: translate(0, 0);
				visibility: visible;
			}

			100% {
				transform: translate(-100%, 0);
			}
		}

		.ticker-wrap {
			position: fixed;
			bottom: 0;
			left: 50%;
			transform:translate(-50%);
			width: 100%;
			overflow: hidden;
			height: 4rem;
			background-color: rgba(0, 0, 0, 0.9);
			padding-left: 100%;
			box-sizing: content-box;
			z-index:10000;
		}

		.ticker {
			display: inline-block;
			height: 4rem;
			line-height: 4rem;
			white-space: nowrap;
			padding-right: 100%;
			box-sizing: content-box;
			will-change: transform;
		}

		.ticker-item {
			display: inline-block;
			padding: 0 2rem;
			font-size: 2rem;
			color: white;
			font-family: Roboto, sans-serif;
		}
	`,
		head = document.head || document.getElementsByTagName("head")[0],
		style = document.createElement("style");

	head.appendChild(style);

	style.type = "text/css";
	if (style.styleSheet) {
		// This is required for IE8 and below.
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}

	let chyronHTML = `
	<div class="ticker-wrap">
			<div class="ticker">
			</div>
		</div>`;

	// public
	return {
		add: (snippets) => {
			document.body.innerHTML += chyronHTML;

			let snippetContainer = "";
			for (let i = 0; i < snippets.length; i++) {
				snippetContainer += '<div class="ticker-item">• • • ';
				snippetContainer += snippets[i];
				snippetContainer += " • • •&nbsp;&nbsp;&nbsp;";
				snippetContainer += "</div>";
			}
			//write tickers to page
			let chyron = document.querySelector(".ticker");
			chyron.innerHTML = snippetContainer;

			//get length in characters of all snippets
			let snipJoin = snippets.join();
			characterLength = snipJoin.length;
			
			//set length of animation in ms to length of all snippet characters 
			//multiplied by multiplier (150)
			chyron.style.animation = "" + (characterLength * 150) + "ms ticker linear infinite";
		}
	};
	
})();
