<template>

  <section>
    <div class="container">
      <BaseHeader :baseHeaderModel="header" />
      <div class="flex-column">
        <form >
          <div class="flex-column">
            <ul>

              <BaseInput v-for="(input, index) in inputs" :baseInputModel="input" v-bind:key="index"/>
            </ul>
            <BaseButton
              v-on:buttonClicked="createAccount()"
              :baseButtonModel="buttonSubmit"
            />

            <div class="paragraph-signup flex-row flex-around">
              <BaseParagraph :baseParagraphModel="paragraphSignup" />
              <BaseLink :baseLinkModel="linkToSignup" />
            </div>

          </div>
        </form>
      </div>
    </div>
  </section>

</template>

<script lang="ts">
import Vue from 'vue'
import BaseHeader from "~/components/atoms/typography/header/BaseHeader.vue";
import BaseButton from "~/components/atoms/button/BaseButton.vue";
import BaseParagraph from "~/components/atoms/typography/paragraph/BaseParagraph.vue";
import BaseHeaderModel from "~/components/atoms/typography/header/BaseHeaderModel";
import BaseParagraphModel from "~/components/atoms/typography/paragraph/BaseParagraphModel";
import BaseButtonModel from "~/components/atoms/button/BaseButtonModel";
import BaseInput from "~/components/atoms/input/BaseInput.vue";
import BaseLink from "~/components/atoms/link/BaseLink.vue";
import BaseInputModele from "~/components/atoms/input/BaseInputModel";
import BaseLinkModel from "~/components/atoms/link/BaseLinkModel";
import {Result} from "~/api/utils/useCaseResult/Result";
import {User as UserUseCases} from "~/api/useCases/User";

export default Vue.extend({
  components: {
    BaseHeader,
    BaseParagraph,
    BaseButton,
    BaseInput,
    BaseLink
  },
  data(){
    const header: BaseHeaderModel = new BaseHeaderModel(this.$t('layout_index.page_signup.header'), 1, 'light')
    let emailInput: BaseInputModele = new BaseInputModele('email', 'email', 'email', this.$t('layout_index.page_signup.input_email'), true, null, 'dark')
    let usernameInput: BaseInputModele = new BaseInputModele('text', 'username', 'username', this.$t('layout_index.page_signup.input_username'), true, null, 'dark')
    let passwordInput: BaseInputModele = new BaseInputModele('password', 'password', 'password', this.$t('layout_index.page_signup.input_password'), true, null, 'dark')
    let repeatPasswordInput: BaseInputModele = new BaseInputModele('password', 'repeatPassword', 'repeatPassword', this.$t('layout_index.page_signup.input_repeat_password'), true, null, 'dark')

    let inputs: Array<BaseInputModele> = [
      emailInput,
      usernameInput,
      passwordInput,
      repeatPasswordInput
    ]

    const buttonSubmit: BaseButtonModel = new BaseButtonModel(this.$t('layout_index.page_signup.button'), 'primary', 'button', 'normal', '', false, true)
    const paragraphSignup: BaseParagraphModel = new BaseParagraphModel(this.$t('layout_index.page_signup.paragraph_signin'), 'dark')
    const linkToSignup: BaseLinkModel = new BaseLinkModel(this.$t('layout_index.page_signup.link_to_signin'), 'primary', './signin')

    const userUseCase: UserUseCases = new UserUseCases()

    return {
      header,
      inputs,
      buttonSubmit,
      paragraphSignup,
      linkToSignup,
      userUseCase
    }
  },
  methods : {
    async createAccount(){
      const result : Result = this.userUseCase.register(this.inputs)

      if(result.isSuccessful()){
        return
      }

      for(const error of result.errors){
        const explodedErrorType: Array<string> = error.type.split('/')
        switch (explodedErrorType[2]) {
          case "repeatPassword": {
            this.inputs.find(i => i.name === explodedErrorType[2])!.error = this.$t('api.useCases.user.register.error.'+explodedErrorType[2]+'.'+explodedErrorType[3])
          }
        }
      }
      console.log(this.inputs)
    }
  }

})
</script>

<style scoped>

section {
  background-color: var(--primary_bg);
  min-height: 100vh;
}

section > div.container {
  margin-left: 10vw;
  margin-right: 10vw;
  min-height: 100%;

}

section > div.container > :global(h1){
  padding: 96px 0
}

section > div.container > div.flex-column {
  width: 100%;
}

form {
  background-color: black;
  border: black solid 1px;
  border-radius: 7px;
  padding: 24px 0;
}

form > div.flex-column > :global(p) {
  padding: 12px 0;
  text-align: center;
}

form > div.flex-column > ul {
  width: 90%;
}

form > div.flex-column > div.paragraph-signup {
  margin-top: 24px;
  width: 40%
}

@media only screen and (min-width: 1024px) {
  form {
    width: 50vw;
    min-height: 33vh;
  }
}

@media only screen and (max-width: 1024px) {
  form {
    width: 80vw;
    height: 80vh;
  }
}
</style>
