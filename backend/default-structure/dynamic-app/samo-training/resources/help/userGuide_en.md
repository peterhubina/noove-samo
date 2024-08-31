<div style="text-align:justify">
<div style="display:none;">do not remove this - this is not going to be visible but it is important to use markdown in above div tag</div>

# User guide
The document describes the basic functionality of the SAMO application from a user point of view. It also provides an overview of possible user actions and explains the steps needed to achieve them.

## Login to the SAMO application
To start using the SAMO application you need to login first using login name and password. Login page (see Figure 1) automatically loads when firstly accessing application URL. There can be different access rights for different parts of the application.

<div style="text-align: center;">

![Login page]({resourceUrl:help/userGuide/login-page.jpg} "Login page")
</div>


## Cockpit
After logging in the SAMO application, the Cockpit Dashboard page will load automatically. From here, you can navigate to other application parts using Menu items or Widgets (see Figure 2).

Blue upper panel provides functionality, which is available in every application part (except Dashboard Editing mode).

<div style="text-align: center;">

![Cockpit Dashboard]({resourceUrl:help/userGuide/cockpit-dashboard.jpg} "Cockpit Dashboard")
</div>


### Overview of available functionality
- **Entity Cart** module enables you to add features from various parts of the application to the Entity Cart and then use them for some business actions (for example Assigning assets to defects). To access the Entity Cart, browse or remove added Features, click on the icon. The functionality of SAMO browse module is included here (see chapter 4.1.1).
- **Recent Activities** module shows features, which were browsed or edited recently. When clicking on specific feature, you will be redirected to corresponding application part showing the Information detail of chosen feature.
- **Messages** module includes messages, which are being sent based on the configuration of business activities (for example Workflow). The functionality of SAMO browse module is also included here (see chapter 4.1.1).
- **User Settings** module can be reached by clicking on the „user&quot; icon. Under this icon, you can find also the possibility to **logout** from the application. The User Settings module enables you to change basic user information, password, notifications and language of the application.
- **Dashboard Editing** module enables you to customize (see Figure 3) Cockpit Dashboard by adding and removing predefined Widgets (see chapter 3.1.1). Some of the widgets are fixed by configuration and cannot be removed.

<div style="text-align: center;">

![Cockpit Dashboard Editing module]({resourceUrl:help/userGuide/cockpit-dashboard-edit.jpg} "Cockpit Dashboard Editing module")
</div>


### Predefined widgets / applications
- **Assets** – used for displaying, locating, creating and editing water, electricity and lighting assets.
- **Defects** - used for displaying, locating, creating and editing defects on the assets including control of their workflow
- **Construction** – prototype for Construction Application Part; it contains oerview of constructions, status of their implementation. Revision, completion and documentation.
- **Sketching** – application for managing „sketching&quot; obejcts and attached protocols.
- **Work Orders** – application for entering and managing work activities on defects. Currently not used.


### Responsive design
You can demonstrate responsive design behaviour in different ways:
- click e.g. on Defects widget
- start development mode (F12 key)
- toggle to Responsive and select „iPad&quot;

<div style="text-align: center;">

![Switch to mobile view]({resourceUrl:help/userGuide/switch-to-mobile-view.jpg} "Switch to mobile view")
</div>

- you can change rotation
- click on Cockpit, Show Recent messages etc.
- select „iPhone 6&quot;
- click on Cockpit, Show Recent messages etc.
- exit development mode (F12 key)


## Application part
When you navigate to specific application part using either Widget or Menu Item you will be redirected to the **Dashboard** of Application part or directly to the Application **page**.

Application part Dashboard contains also **Favorite links** section in the side panel (see Figure 4). Here you can create and edit link to the specific part of Application part (for example Browse View of filtered features) which you use frequently.

<div style="text-align: center;">

![Application part (Assets) Dashboard]({resourceUrl:help/userGuide/assets-dashboard.jpg} "Application part (Assets) Dashboard")
</div>


### Application page
You can navigate to specific application page using either Widget or Menu Item from the Application part Dashboard.

There are currently two page´s default view settings – **SAMO Browse** and **SAMO Map**. However, you can toggle between them if this option is not disabled.

In the Application page, blue upper panel provides new functionality – creating new feature (see Figure 5). After clicking on „plus&quot; icon the Edit Form, where you can fill in the attributes and create feature´s geometry, will popup. After saving the Edit Form, the new feature will be created in the database.

#### Samo Browse
In SAMO Browse view features are visible in the table form with various functionality (see Figure 5, chapter 4.1.1.1). You can sort features by column, open feature´s Information Detail, filter and select features. Multiple actions can be applied on selected features. They can be removed, added to Entity Cart, showed in map or exported to Excel table. Filter can be set up by clicking in the filter field, selecting attribute and then value to filter by.

<div style="text-align: center;">

![SAMO Browse view on Application part Assets, Application page Lighting]({resourceUrl:help/userGuide/browse-view-assets.jpg} "SAMO Browse view on Application part Assets, Application page Lighting")
</div>


##### Overview of available functionality
- Change sorting (ascending/descending) of records by double click on one or more column´s header
- Change width of selected column by means of slider displayed within header row
- Filter records via selected „Search&quot; mode; typically by selecting given feature type
- Filter records via selected „Search&quot; mode using some of the entered attribute value for dispalyed columns
- Filter records using fulltext searching (without selected Search mode)
- Toggle displaying mode of records (list, tiles, table)
- Export record to Excel file
- Add selected record to Entity Cart
- Open feature Info detail by clicking on given row
- Change the ratio between detail/browse panel
- Create new feature

#### Samo Map
In SAMO Map view features are visible on the map with various functionality (see Figure 6, chapter 4.1.2.1). When clicking on „layers&quot; icon you can switch on and off desirable map layers. Multiple layers can be seen at time, you can change their opacity individually. The „Search result&quot; layer is linked to SAMO Browse and shows only filtered features. Under the „briefcase&quot; icon there are selection and measurement tools. You can select single features with left mouse click or multiple features when choosing „select with rectangle&quot; tool (the uppermost one) in the menu. You can also measure distances and areas. With the „target&quot; icon you can turn on and off your current location. There is also a possibility to search location based on address details (street name, street number, city…).

<div style="text-align: center;">

![SAMO Map view on Application part Assets, Application page Water assets]({resourceUrl:help/userGuide/assets-map-view.jpg} "SAMO Map view on Application part Assets, Application page Water assets")
</div>


##### Overview of available functionality
- Zoom in/out, pan (mouse)
- Show the list of layers
- Toggle Map layers on/off
- Addjust Map layer opacity
- Show Feature Info Detail by clicking on Feature
- Select features by click (hold SHIFT to select multiple features)
- Select features by rectangle
- Add selected features to Entity Cart
- Measure distances and areas
- Toggle your current location on/off
- Search location using address details (street name, street number, city…)



##### Grouping of objects in the map
There is possibility to define „clustered&quot; symbology in metadata for objects in map whose density on given area is high or whose distance is small. Then „clustered&quot; symbolog is used for graphical representation of such group of objects – typically as filled circle with the text that shows the number of clustered objects – see the picture below.

You can demonstrate it from application part „Defects&quot;, with using of map for all defects and proper zoom level.

<div style="text-align: center;">

![SAMO map with clusterd symbology for dense group of objects (Defects)]({resourceUrl:help/userGuide/map-cluster.jpg} "SAMO map with clusterd symbology for dense group of objects (Defects)")
</div>


##### Using of defined „intents&quot;
You can use standard or custom definde „intents&quot; for individual records displayed in browse. In the picture below you can see several standard intents as „Show detail&quot;, „Show in map&quot;, „Add to cart&quot; etc. and some custom intents as „Defects manager&quot;.

The list of intents is available for each record via selector icon on the right hand side within individual record.

<div style="text-align: center;">

![Example of defined \"intents\" for individual records]({resourceUrl:help/userGuide/item-intents.jpg} "Example of defined \"intents\" for individual records")
</div>


#### Information Detail
Information Detail can be accessed by clicking on feature in SAMO Browse or in SAMO Map. You can also dynamically change the width of the section, or collapse the Detail to the side. Each Information Detail is divided to multiple **sections**. You can view Information Detail using scrolling or using navigation icons, which scroll the Detail to chosen section automatically. Sections can be collapsed or expanded and viewed in different predefined modes (List, Tiles…).

Information Detail provides overview of feature´s attributes, attachments, assigned features, activities, workflow and others. It is also enriched by various functionality (see Figure 7, Figure 8, chapter 4.1.3.1).

You can **edit feature attributes** in Edit Form, which opens up after clicking on „pencil&quot; icon. There you can change values of chosen attributes if their modification is allowed. After saving the Edit Form, changes will be saved to the database.

You can also **remove feature** by clicking on „trash can&quot; icon.

**Feature** can be **added to the Entity Cart** also directly from the Information Detail when clicking on „shopping cart&quot; icon.

You can **locate** the feature **on the map** by clicking on the „marker&quot; icon. The map will automatically center and zoom in on the feature.

In general, business features have more sections in Information Detail.

**Workflow section** can be used for managing business processes (for example changing state of the Defect) by clicking on blue arrow and selecting desired state. A process will run on the background triggering various actions based on its configuration.

**Activity, Address, Assigned assets** and **Attachments** sections work on the same basis. You can add new feature by clicking on the „plus&quot; icon. This action will either open up corresponding Edit Form, or in case of Attachments the Web Browser´s default popup „Upload File Window&quot;. You can also show the feature´s Detail by clicking on it.

<div style="text-align: center;">

![Information Detail of Lighting Asset]({resourceUrl:help/userGuide/lighting-detail.jpg} "Information Detail of Lighting Asset")
</div>

<div style="text-align: center;">

![Information Detail of Water Defect]({resourceUrl:help/userGuide/water-defects.jpg} "Information Detail of Water Defect")
</div>


##### Overview of available functionality
- Edit feature attributes and position
- Remove feature
- Add feature to the Entity Cart
- Locate feature on the Map
- Navigate between different Information Detail sections using side icons
- Change width of Information Detail
- Change state of feature in workflow
- Add new assigned feature or relation
- Show assigned feature´s Information Detail
- Toggle displaying mode of Information Detail section (list/tiles)
- Upload Attachment

#### Entity Cart
Entity Cart submodule enables you to add features from various parts of the application and then use them for some business actions (the set of such business actions/functionality will be added subsequently).

##### Overview of available functionality
- Change sorting (ascending/descending) of records by double click on column header
- Change width of selected column by means of slider displayed within header row
- Toggle displaying mode of records (list, tiles, table)
- Set displaying on/off for selected columns
- Clear all instances from Entity Cart

<div style="text-align: center;">

![Select display mode]({resourceUrl:help/userGuide/switch-to-mobile-view.jpg} "Select display mode")
</div>

With selected records you can:
- Clear them from Entity Cart
- Use some defined „action&quot;, e.g. for locating them in map, show detail information form etc.

<div style="text-align: center;">

![Handling selected records]({resourceUrl:help/userGuide/handling-selected-items.jpg} "Handling selected records")
</div>
<div>