<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">Категорий еще нет. <router-link to="/categories">Создать категорию.</router-link></p>

    <form v-else class="form" @submit.prevent="handleSubmit">
      <div class="input-field" >
        <select 
          ref="select"
          v-model="category"
          :class="{invalid: $v.category.$dirty && !$v.category.required}"
        >
          <option value="" disabled selected>Выберите категорию</option>
          <option
            v-for="cat in categories"
            :value="cat.id"
            :key="cat.id"
          >{{ cat.title }}</option>
        </select>
        <label>Выберите категорию</label>
        <span
          v-if="$v.category.$dirty && !$v.category.required"
          class="helper-text invalid"
        >Выберите категорию</span>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{invalid: $v.amount.$dirty && !$v.amount.minValue}"
        >
        <label for="amount">Сумма</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
        >Минимальное значение {{$v.amount.$params.minValue.min}}</span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{invalid: $v.description.$dirty && !$v.description.required}"
        >
        <label for="description">Описание</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
        >Введите описание</span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import Loader from '@/components/app/Loader'
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'record',
  components: {
    Loader
  },
  data: () => ({
    select: null,
    loading: true,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    category: { required },
    description: { required },
    amount: { minValue: minValue(1) }
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord () {
      if (this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    }
  },
  methods: {
    async handleSubmit () {
      // Валидация формы
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        // Через вычисляемое св-во проверяю достаточно ли средств на балансе для совершения расхода
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            type: this.type,
            description: this.description,
            date: new Date().toJSON()
          })
          // Обновление текущего счета юзера
          const billUpdate = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount

          await this.$store.dispatch('updateBill', { bill: billUpdate })
          this.$message(`Запись успешно создана!`)
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (e) {}
      } else {
        this.$message(`Ваш расход превышает текущий баланс. Не хватает: ${this.amount - this.info.bill}`)
      }
    }
  },
  async mounted () {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false

    this.$nextTick(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    })
  },
  destroyed () {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
