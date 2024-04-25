/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit.js":
/*!*********************!*\
  !*** ./src/edit.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_1__);


const {
  __
} = wp.i18n;
const {
  InspectorControls
} = wp.editor;
const {
  PanelBody,
  RangeControl,
  SelectControl,
  ToggleControl
} = wp.components;
const {
  Fragment
} = wp.element;
function Edit(props) {
  const {
    postTypes
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.useSelect)(select => {
    const {
      getPostTypes
    } = select('core');
    const query = {
      per_page: -1,
      public: 1
    };
    return {
      postTypes: getPostTypes(query)
    };
  });
  let catOptions = [];
  let options = [];
  if (postTypes) {
    options.push({
      value: 0,
      label: 'Select a post'
    });
    postTypes.forEach(postType => {
      options.push({
        value: postType.slug,
        label: postType.name
      });
    });
  } else {
    options.push({
      value: 0,
      label: 'Loading...'
    });
  }

  /* Fetch categories from selected post */

  function updatePost(value) {
    props.setAttributes({
      SelectedPostType: value
    });
    /*if(postType.taxonomies.length){
        let taxonomies = postType.taxonomies;
        catOptions.push( { value: '0', label: 'Select Category' } );
        taxonomies.forEach((taxonomy) => {
            catOptions.push( { value: taxonomy, label: taxonomy } );
        });
    }
    else {
        catOptions.push( { value: '0', label: 'Loading...' } );
    }*/
    const {
      categories
    } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_1__.withSelect)((select, props) => {
      return {
        categories: select('core').getEntityRecords('taxonomy', value ? value : 'category', {
          per_page: -1,
          hide_empty: true
        })
      };
    });
    console.log(categories);
    if (categories && categories.length > 0) {
      catOptions.push({
        value: '0',
        label: 'Select Category'
      });
      categories.forEach(cat => {
        if (props.attributes.selectedCategory === cat.id) {
          catOptions.push({
            value: cat.id,
            label: cat.name,
            selected: true
          });
        } else {
          catOptions.push({
            value: cat.id,
            label: cat.name
          });
        }
      });
    } else {
      catOptions.push({
        value: '0',
        label: 'Loading...'
      });
    }
  }
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: 'Select Post Type'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: "Select Post Type",
    value: props.attributes.SelectedPostType,
    options: options
    // onChange={(value) => props.setAttributes({SelectedPostType: value})}
    ,
    onChange: updatePost
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: 'Select Post Type to show all categories'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: "Select categories",
    value: props.attributes.selectedCategory,
    options: catOptions,
    onChange: value => props.setAttributes({
      selectedCategory: value
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: 'Parameter Settings'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(RangeControl, {
    value: props.attributes.posts_per_page,
    label: 'Number of posts',
    min: 0,
    max: 50,
    initialPosition: 12,
    allowReset: true,
    onChange: value => props.setAttributes({
      posts_per_page: value
    })
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: "Order By",
    value: props.attributes.order,
    options: [{
      label: 'Ascending',
      value: 'ASC'
    }, {
      label: 'Descending',
      value: 'DESC'
    }],
    onChange: value => props.setAttributes({
      order: value
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: 'Post Meta Settings'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
    label: "Display Post Date",
    checked: props.attributes.post_date,
    onChange: value => props.setAttributes({
      post_date: value
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: 'Post Excerpt Settings'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ToggleControl, {
    label: "Display Post Excerpt",
    checked: props.attributes.post_content,
    onChange: value => props.setAttributes({
      post_content: value
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(PanelBody, {
    title: 'Image Settings'
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(SelectControl, {
    label: "Image Size",
    value: props.attributes.imagesize,
    options: [{
      label: 'Thumbnail',
      value: 'thumbnail'
    }, {
      label: 'Medium',
      value: 'medium'
    }, {
      label: 'Large',
      value: 'large'
    }, {
      label: 'Full',
      value: 'full'
    }],
    onChange: value => props.setAttributes({
      imagesize: value
    })
  }))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, __('Latest posts', 'dmb-blocks')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "latest-wrapper"
  }, !props.attributes.SelectedPostType ? 'Select post type please' : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(LatestPosts, {
    props: props.attributes
  }))));
}
const LatestPosts = ({
  props
}) => {
  const {
    result
  } = props;
  console.log(result);
  if (!result) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, __('Loading...', 'dbm-blocks'));
  }
  if (result.length === 0) {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, __('No posts were found...', 'dbm-blocks'));
  }
  return result.map(item => {
    const {
      id,
      title,
      thumbnail,
      excerpt
    } = item;
    const image = thumbnail ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("img", {
      src: thumbnail
    }) : 'Thumbnail is empty';
    return item;
  });
};

/***/ }),

/***/ "./src/save.js":
/*!*********************!*\
  !*** ./src/save.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ save)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */


/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
function save(props) {
  return null;
}

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "./src/block.json":
/*!************************!*\
  !*** ./src/block.json ***!
  \************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"title":"FYNXWP: Latest posts","name":"fynx-blocks/latest-cpt-posts","category":"design","description":"Display a list of your most recent posts including custom post types.","textdomain":"default","icon":"universal-access-alt","keywords":["recent post","latest post"],"attributes":{"SelectedPostType":{"type":"string"},"PostType":{"type":"string"},"posts_per_page":{"type":"number"},"order":{"type":"string"},"post_date":{"type":"string"},"post_content":{"type":"string"},"imagesize":{"type":"string"}},"supports":{"align":true,"html":false,"color":{"gradients":true,"link":true,"__experimentalDefaultControls":{"background":true,"text":true,"link":true}},"spacing":{"margin":true,"padding":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true}}}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit */ "./src/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./save */ "./src/save.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./block.json */ "./src/block.json");
/**
 * BLOCK: "FYNXWP: Latest posts"
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */
const {
  __
} = wp.i18n;




/**
 * Register: Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

const {
  registerBlockType
} = wp.blocks; // Import registerBlockType() from wp.blocks

registerBlockType(_block_json__WEBPACK_IMPORTED_MODULE_2__.name, {
  title: __("FYNXWP: Latest posts"),
  description: __('Display a list of your most recent posts including custom post types.'),
  icon: _block_json__WEBPACK_IMPORTED_MODULE_2__.icon,
  category: _block_json__WEBPACK_IMPORTED_MODULE_2__.category,
  keywords: [__('Recent posts'), __('Latest post')],
  attributes: _block_json__WEBPACK_IMPORTED_MODULE_2__.attributes,
  edit: _edit__WEBPACK_IMPORTED_MODULE_0__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_1__["default"]
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map