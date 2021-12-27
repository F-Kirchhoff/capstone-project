type ValidationMsg = {
  ok: boolean
  msg: string
}

export default function validateString(string: string): ValidationMsg {
  if (string.length < 3 || string.length > 40) {
    return {
      ok: false,
      msg: 'Name must contain between 3 and 40 characters.',
    }
  }

  if (
    string
      .split('')
      .map(char => char.charCodeAt(0))
      .some(
        charCode =>
          !between(charCode, 45, 46) &&
          !between(charCode, 48, 57) &&
          !between(charCode, 65, 90) &&
          !between(charCode, 95, 95) &&
          !between(charCode, 97, 122)
      )
  ) {
    return {
      ok: false,
      msg: 'Name may only contain [A-Z], [a-z], [0-9] or [. - _].',
    }
  }
  return {
    ok: true,
    msg: 'OK',
  }
}

function between(n: number, lower: number, higher: number): boolean {
  return lower <= n && n <= higher
}
