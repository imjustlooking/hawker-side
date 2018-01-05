# Hawker(side)Pay by Gabriel Lu & Nikita


Introduction
------
![hawkersidePay landing page](/public/landing_page_screenshot.png)

HawkerPay is a two-part mobile app which aims to streamline the food order and collection process in Singaporean hawker stalls. This git repository only stores and documents the work done for the hawker-side interface of the app. To access the hosted hawker-side app, please click [here](https://hawkersidepay.herokuapp.com/).

As mentioned previously, this app is two-part, one being the user interface, and the other being the hawker interface (which is what this app is).

Hawker(side)Pay and HawkerPay connect to a common database, where the apps let both the patron and the hawker to interact with each other.

To summarize the available user stories for the **hawker**:
1. Adjust available menu items
2. View order lists
3. Toggle order status

To summarize the available user stories for the **patron**:
1. View hawker menu
2. Add orders to cart
3. Make payment
4. View order status

Technologies used
------
1. Front-end: [React](https://reactjs.org/) (Javascript Library)
2. Database & authentication: [Firebase](https://firebase.google.com/)

How it works
------
### Data structuring
We used the in-built Gmail authentication from firebase which took care of log-ins. However, we needed to make sure that each hawker/patron only views the data that is relevant to themselves.

To ensure this, we restructured the Firebase data such that each patron/hawker contributed data goes under a unique patron/hawker ID. For both the hawker and patron sides of the app, each account has a unique ID which is generated on signup.

### Menu adjustment
Upon login, each hawker is assigned an ID, to which he can then update the menu tagged to this ID.

Under the Menu tab, the hawker can submit the dishes and corresponding price using a form. Since the hawkers may have different number of items, we added a dynamic 'Add dish' button which generates additional fields with each click.

![hawkersidePay add dish preview](/public/hawkerPay_addpreview.gif)

If a current menu under H1 exists, it will overwrite the previous menu. This feeds into the user side view of HawkerPay where they will see the updated dishes and prices.

### Order status changing
Patrons ordering through the same hawker will send orders to one specific ID.

For the purpose of demonstration, we have hard-coded the hawker ID to H1, which has 2 pending orders to prepare. Note that orders will only be sent to the hawker after 'payment' is received. The hawker can then double click on the order item to send a complete order status over.

![hawkersidePay double click preview](/public/image/hawkerPay_clickpreview.gif)

Challenges
------
We created this app as our project 4 deliverable, with each of the 2 man team focusing on one-side of the app, myself being the hawkersidePay. There was a definite time constraint, coupled with having to constantly restructure the data to suit both interfaces.

One struggle I faced in hawkerSidePay is that we passed the login state (this.state.user) to the child components such as Menu and Orders upon redirect using React-dom-router.
```
<Route path='/orders' render={() => <Orders loggedIn={this.state.user} />} />
<Route path='/menu' render={() => <MenuSetup loggedIn={this.state.user} />} />
```

 This meant that the app will only recognize the unique ID of the hawker if he had clicked Menu/Orders after logging in. Otherwise, it will show no corresponding orders/menu.

 The way we overcame this was to redirect the user to the root page after logging in/out, such that the user has to click on Menu/Orders instead of refreshing the current page they were on. This forces them to get this.state.user as props through clicking on the tabs again. A little 'hacky' but it works for now.

 It would have been better if we used a way which allows this.state.user to persist throughout the session, perhaps by lifting the state up to the NavParent component? Though at the point of this project, React and Firebase were both new technologies to us, so I think we still did an alright job, albeit less polished one.
