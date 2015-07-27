    <md-toolbar>
      <div class="md-toolbar-tools">
        <h2>
          <span>Keep</span>
        </h2>
        <span flex></span>
        <md-button class="md-icon-button" aria-label="More" ng-click="user.logout()">
          <span class="mdi mdi-power"></span>
        </md-button>
      </div>
    </md-toolbar>

<div class="canvas">
    <h3>Users</h3>  
    <button class="btn btn-primary" style="margin-bottom: 10px" ng-click="user.getUsers()">Get Users!</button>
    <ul class="list-group" ng-if="user.users">
        <li class="list-group-item" ng-repeat="user in user.users">
            <h4>{{user.name}}</h4>
            <h5>{{user.email}}</h5>
        </li>
    </ul>
    <div class="alert alert-danger" ng-if="user.error">
        <strong>There was an error: </strong> {{user.error.error}}
        <br>Please go back and login again
    </div>
</div>