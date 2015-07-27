<div class="login">
    <h3>Keep</h3>
    <md-card class="login-form">
        <form>
            <md-input-container>
                <label>Email</label>
                <input type="email" ng-model="auth.email">
            </md-input-container>
            <md-input-container>
                <label>Senha</label>
                <input type="password" ng-model="auth.password">
            </md-input-container>
            <md-button ng-click="auth.login()" class="md-raised md-primary">Entrar</md-button>
        </form>
    </md-card>
</div>