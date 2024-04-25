import {useSelect,withSelect} from '@wordpress/data';
const {__} = wp.i18n;
const {InspectorControls} = wp.editor;
const {PanelBody, RangeControl, SelectControl, ToggleControl} = wp.components;
const {Fragment} = wp.element;
export default function Edit(props) {

    const {postTypes} = useSelect((select) => {
        const {getPostTypes} = select('core');
        const query = {
            per_page: -1,
            public: 1,
        }
        return {
            postTypes: getPostTypes(query),
        }
    });
    let catOptions = [];
    let options = [];
    if (postTypes) {
        options.push({value: 0, label: 'Select a post'})
        postTypes.forEach((postType) => {
            options.push({value: postType.slug, label: postType.name});
        });
    } else {
        options.push({value: 0, label: 'Loading...'})
    }

    /* Fetch categories from selected post */

    function updatePost(value){
        props.setAttributes({
            SelectedPostType: value,
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
        const {categories} = withSelect((select,props) => {
            return {
                categories:select( 'core' ).getEntityRecords(
                    'taxonomy',
                    value?value:'category',
                    { per_page: -1, hide_empty: true }
                ),
            }
        });
        console.log(categories);

        if ( categories && categories.length > 0 ) {
            catOptions.push( { value: '0', label: 'Select Category' } );
            categories.forEach( ( cat ) => {
                if ( props.attributes.selectedCategory === cat.id ) {
                    catOptions.push( {
                        value: cat.id,
                        label: cat.name,
                        selected: true,
                    } );
                } else {
                    catOptions.push( { value: cat.id, label: cat.name } );
                }
            } );
        } else {
            catOptions.push( { value: '0', label: 'Loading...' } );
        }
    }

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={'Select Post Type'}>
                    <SelectControl
                        label="Select Post Type"
                        value={props.attributes.SelectedPostType}
                        options={options}
                        // onChange={(value) => props.setAttributes({SelectedPostType: value})}
                        onChange={ updatePost }/>
                </PanelBody>
                <PanelBody title={'Select Post Type to show all categories'}>
                    <SelectControl
                        label="Select categories"
                        value={props.attributes.selectedCategory}
                        options={catOptions}
                        onChange={(value) => props.setAttributes({selectedCategory: value})}/>
                </PanelBody>
                <PanelBody title={'Parameter Settings'}>
                    <RangeControl
                        value={props.attributes.posts_per_page}
                        label={'Number of posts'}
                        min={0}
                        max={50}
                        initialPosition={12}
                        allowReset
                        onChange={(value) => props.setAttributes({posts_per_page: value})}/>
                    <SelectControl
                        label="Order By"
                        value={props.attributes.order}
                        options={[
                            {label: 'Ascending', value: 'ASC'},
                            {label: 'Descending', value: 'DESC'},
                        ]}
                        onChange={(value) => props.setAttributes({order: value})}
                    />
                </PanelBody>
                <PanelBody title={'Post Meta Settings'}>
                    <ToggleControl
                        label="Display Post Date"
                        checked={props.attributes.post_date}
                        onChange={(value) => props.setAttributes({post_date: value})}
                    />
                </PanelBody>
                <PanelBody title={'Post Excerpt Settings'}>
                    <ToggleControl
                        label="Display Post Excerpt"
                        checked={props.attributes.post_content}
                        onChange={(value) => props.setAttributes({post_content: value})}
                    />
                </PanelBody>
                <PanelBody title={'Image Settings'}>
                    <SelectControl
                        label="Image Size"
                        value={props.attributes.imagesize}
                        options={[
                            {label: 'Thumbnail', value: 'thumbnail'},
                            {label: 'Medium', value: 'medium'},
                            {label: 'Large', value: 'large'},
                            {label: 'Full', value: 'full'},
                        ]}
                        onChange={(value) => props.setAttributes({imagesize: value})}
                    />
                </PanelBody>
            </InspectorControls>
            <div>
					<h3>{ __( 'Latest posts', 'dmb-blocks' ) }</h3>
					<div className="latest-wrapper">
						{ ! props.attributes.SelectedPostType ? (
							'Select post type please'
						) : (
							<LatestPosts props={ props.attributes } />
						) }
					</div>
            </div>
        </Fragment>
    );
}

const LatestPosts = ( { props } ) => {
    const { result } = props;
    console.log(result);
    if ( ! result ) {
        return (
            <div>
                { __( 'Loading...', 'dbm-blocks' ) }
            </div>
        );
    }

    if ( result.length === 0 ) {
        return <div>{ __( 'No posts were found...', 'dbm-blocks' ) }</div>;
    }

    return result.map( ( item ) => {
        const { id, title, thumbnail, excerpt } = item;
        const image = thumbnail ? (
            <img src={ thumbnail } />
        ) : (
            'Thumbnail is empty'
        );

        return (
          item
        );
    } );
};